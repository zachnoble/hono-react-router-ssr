import { Resend } from 'resend'

import type { Config } from './config'

export type EmailClient = ReturnType<typeof newEmailClient>

export const newEmailClient = (config: Config) => {
	const resend = new Resend(config.EMAIL_API_KEY)

	const sendEmail = async (options: {
		from?: string
		to: string
		subject: string
		html: string
	}) => {
		if (config.NODE_ENV === 'test') return

		return await resend.emails.send({
			...options,
			from: options.from ?? config.EMAIL_FROM_ADDRESS,
		})
	}

	return {
		sendEmail,
	}
}
