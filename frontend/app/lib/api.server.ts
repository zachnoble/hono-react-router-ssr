import { createContext, type MiddlewareFunction, type RouterContextProvider } from 'react-router'

import { config } from './config.server'
import { parseError } from '~/lib/errors'

/* ---- API Client ---- */

type Params = Record<string, string | number | null | undefined>

type RequestOptions = Omit<RequestInit, 'body'> & {
	params?: Params
	body?: unknown
	signal?: AbortSignal
}

type ApiResult<T> =
	| { ok: true; data: T; response: Response; error: null }
	| { ok: false; data: null; response: null; error: string }

export type Client = {
	get: <T>(path: string, options?: RequestOptions) => Promise<ApiResult<T>>
	post: <T>(path: string, body?: unknown, options?: RequestOptions) => Promise<ApiResult<T>>
	put: <T>(path: string, body?: unknown, options?: RequestOptions) => Promise<ApiResult<T>>
	patch: <T>(path: string, body?: unknown, options?: RequestOptions) => Promise<ApiResult<T>>
	delete: <T>(path: string, options?: RequestOptions) => Promise<ApiResult<T>>
}

export const createAPIClient = (baseUrl: string, request?: Request): Client => {
	const headers = new Headers()

	if (request) {
		const cookie = request.headers.get('cookie')
		if (cookie) headers.set('Cookie', cookie)

		const xForwardedFor = request.headers.get('x-forwarded-for')
		if (xForwardedFor) headers.set('X-Forwarded-For', xForwardedFor)

		const origin = request.headers.get('origin') ?? new URL(request.url).origin
		headers.set('Origin', origin)

		return initMethods(baseUrl, headers)
	}

	return initMethods(baseUrl)
}

/* ---- Middleware ---- */

type APIClientContext = {
	client: Client
}

export const apiClientContext = createContext<APIClientContext | null>(null)

export const apiClientMiddleware = (): MiddlewareFunction => {
	return async ({ context, request }, next) => {
		const client = createAPIClient(config.API_URL, request)
		context.set(apiClientContext, { client })
		return await next()
	}
}

export const client = (context: Readonly<RouterContextProvider>) => {
	const client = context.get(apiClientContext)?.client
	if (!client) throw new Error('Client called outside of API Client Context')
	return client
}

/* --- Utils --- */

const combineHeaders = (...headers: (HeadersInit | null | undefined)[]): Headers => {
	const combined = new Headers()
	for (const header of headers) {
		if (!header) continue

		for (const [key, value] of new Headers(header).entries()) {
			combined.append(key, value)
		}
	}
	return combined
}

const createURL = (baseUrl: string, path: string, params?: Params) => {
	const url = new URL(path, baseUrl)
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value !== null && value !== undefined) {
				url.searchParams.append(key, String(value))
			}
		}
	}
	return url.toString()
}

const fetcher = async <T>(
	baseUrl: string,
	path: string,
	method: string,
	options: RequestOptions = {},
): Promise<ApiResult<T>> => {
	try {
		const url = createURL(baseUrl, path, options.params)
		const body = options.body ? JSON.stringify(options.body) : undefined
		const headers = combineHeaders(options.headers, {
			'Content-Type': 'application/json',
		})
		const { signal } = options

		const init: RequestInit = {
			method,
			headers,
			body,
			signal,
			credentials: 'include',
		}

		const response = await fetch(url, init)

		if (!response.ok) {
			const data = await response.json()
			const message = parseError(data)
			return { ok: false, data: null, response: null, error: message }
		}

		const contentType = response.headers.get('content-type') ?? ''
		const data = contentType.includes('application/json')
			? await response.json()
			: await response.text()

		return {
			ok: true,
			data,
			response,
			error: null,
		}
	} catch (error) {
		return {
			ok: false,
			data: null,
			response: null,
			error: parseError(error),
		}
	}
}

const createBodyMethod = (baseUrl: string, method: string, headers?: Headers) => {
	return <T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResult<T>> =>
		fetcher<T>(baseUrl, path, method, {
			...options,
			body,
			headers: combineHeaders(headers, options?.headers),
		})
}

const createNoBodyMethod = (baseUrl: string, method: string, headers?: Headers) => {
	return <T>(path: string, options?: RequestOptions): Promise<ApiResult<T>> =>
		fetcher<T>(baseUrl, path, method, {
			...options,
			headers: combineHeaders(headers, options?.headers),
		})
}

const initMethods = (baseUrl: string, headers?: Headers) => {
	return {
		get: createNoBodyMethod(baseUrl, 'GET', headers),
		post: createBodyMethod(baseUrl, 'POST', headers),
		put: createBodyMethod(baseUrl, 'PUT', headers),
		patch: createBodyMethod(baseUrl, 'PATCH', headers),
		delete: createNoBodyMethod(baseUrl, 'DELETE', headers),
	}
}
