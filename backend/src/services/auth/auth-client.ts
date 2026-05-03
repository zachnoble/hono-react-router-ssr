import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { emailOTP } from 'better-auth/plugins'

import { DB } from '~/db'
import { account } from '~/db/schemas/account'
import { session } from '~/db/schemas/session'
import { user } from '~/db/schemas/user'
import { verification } from '~/db/schemas/verification'
import { Config } from '~/lib/config'
import { EmailClient } from '~/lib/email'

export type AuthClient = ReturnType<typeof newAuthClient>

type Dependencies = {
	config: Config
	db: DB
	emailClient: EmailClient
}

export const newAuthClient = ({ config, db, emailClient }: Dependencies) => {
	return betterAuth({
		baseURL: `http://${config.HOST}:${config.PORT}`,
		basePath: '/auth',
		trustedOrigins: [config.FRONTEND_URL],
		secret: config.SIGNATURE,
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 60 * 5, // 5 mins
			},
		},
		database: drizzleAdapter(db, {
			provider: 'pg',
			schema: {
				user,
				session,
				account,
				verification,
			},
		}),
		socialProviders: {
			google: {
				clientId: config.GCP_OAUTH_CLIENT_ID ?? '',
				clientSecret: config.GCP_OAUTH_CLIENT_SECRET,
				enabled: Boolean(config.GCP_OAUTH_CLIENT_ID && config.GCP_OAUTH_CLIENT_SECRET),
			},
		},
		plugins: [
			emailOTP({
				async sendVerificationOTP({ email, otp }) {
					await emailClient.sendEmail({
						to: email,
						subject: 'Your verification code',
						html: `<p>Your sign-in code is: <strong>${otp}</strong></p><p>This code expires in 15 minutes.</p>`,
					})
				},
				otpLength: 6,
				expiresIn: 60 * 15,
			}),
		],
	})
}
