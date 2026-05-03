import {
	createContext,
	type MiddlewareFunction,
	type RouterContextProvider,
	replace,
} from 'react-router'

import type { User } from './types'
import { client } from '~/lib/api.server'

type AuthContext = {
	user: User | null
}

type SessionResponse = {
	user: User
	session: { id: string; userId: string; expiresAt: string }
}

const authContext = createContext<AuthContext | null>(null)

export const authMiddleware = (): MiddlewareFunction => {
	return async ({ context, request }, next) => {
		const cookie = request.headers?.get('Cookie')
		const hasSession = Boolean(cookie?.includes('better-auth.session_token='))

		if (hasSession) {
			const api = client(context)
			const result = await api.get<SessionResponse | null>('/auth/get-session')

			if (!result.ok || !result.data?.user) {
				context.set(authContext, null)
			} else {
				context.set(authContext, { user: result.data.user })
			}
		} else {
			context.set(authContext, null)
		}

		return await next()
	}
}

export const getUser = (context: Readonly<RouterContextProvider>) => {
	return context.get(authContext)?.user ?? null
}

export const requireAuth = (context: Readonly<RouterContextProvider>) => {
	const user = getUser(context)
	if (!user) throw replace('/login')
	return user
}

export const requireGuest = (context: Readonly<RouterContextProvider>) => {
	const user = getUser(context)
	if (user) throw replace('/')
	return null
}
