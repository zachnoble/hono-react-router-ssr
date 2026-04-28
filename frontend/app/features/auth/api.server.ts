import { parseWithZod } from '@conform-to/zod/v4'
import { data, redirect, RouterContextProvider } from 'react-router'

import { confirmLoginFormSchema, initiateLoginFormSchema } from './schemas'
import { client } from '~/lib/api.server'
import { toastServerError } from '~/lib/toast'

export const initiateLogin = async (
	context: Readonly<RouterContextProvider>,
	formData: FormData,
) => {
	const api = client(context)

	const submission = parseWithZod(formData, { schema: initiateLoginFormSchema })
	if (submission.status !== 'success') return submission.reply()

	const res = await api.post('/api/auth/email-otp/send-verification-otp', {
		email: submission.value.email,
		type: 'sign-in',
	})

	if (!res.ok) return toastServerError(context, res.error)

	return redirect(`/login/confirm?email=${encodeURIComponent(submission.value.email)}`)
}

export const confirmLogin = async (
	context: Readonly<RouterContextProvider>,
	formData: FormData,
) => {
	const api = client(context)

	const submission = parseWithZod(formData, { schema: confirmLoginFormSchema })
	if (submission.status !== 'success') return submission.reply()

	const result = await api.post('/api/auth/sign-in/email-otp', {
		email: submission.value.email,
		otp: submission.value.code,
	})

	if (!result.ok) return toastServerError(context, result.error)

	return data(null, { headers: result.response.headers })
}

export const logout = async (context: Readonly<RouterContextProvider>) => {
	const api = client(context)

	const res = await api.post('/api/auth/sign-out')
	if (!res.ok) return toastServerError(context, res.error)

	return data(null, {
		headers: res.response.headers,
	})
}
