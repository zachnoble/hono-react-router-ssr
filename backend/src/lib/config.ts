import { z } from 'zod'

export type Config = z.infer<typeof schema>
export type Environment = Config['NODE_ENV']

const schema = z.object({
	NODE_ENV: z.enum(['test', 'development', 'production']),
	HOST: z.string(),
	PORT: z.coerce.number(),
	FRONTEND_URL: z.string().min(1),

	// Signature for signing cookies
	SIGNATURE: z.string().min(1),

	// Postgres
	DB_URL: z.string(),

	// Cache
	CACHE_HOST: z.string().min(1),
	CACHE_PORT: z.coerce.number(),

	// Google OAuth
	GCP_OAUTH_CLIENT_ID: z.string().optional(),
	GCP_OAUTH_CLIENT_SECRET: z.string().optional(),

	// Email with Resend
	EMAIL_API_KEY: z.string().min(1),
	EMAIL_FROM_ADDRESS: z.email(),
})

// Environment-specific defaults
const environmentDefaults: Record<Environment, Partial<Config>> = {
	test: {
		HOST: 'localhost',
		PORT: 8080,
		FRONTEND_URL: 'http://localhost:5173',
		SIGNATURE: 'test-signature',
		DB_URL: 'postgresql://postgres:postgres@localhost:5432/postgres_test',
		CACHE_HOST: 'localhost',
		CACHE_PORT: 6379,
		EMAIL_API_KEY: 'test-key',
		EMAIL_FROM_ADDRESS: 'test@domain.com',
		GCP_OAUTH_CLIENT_ID: '',
		GCP_OAUTH_CLIENT_SECRET: '',
	},
	development: {
		HOST: 'localhost',
		PORT: 8080,
		FRONTEND_URL: 'http://localhost:5173',
		SIGNATURE: 'development-signature',
		DB_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
		CACHE_HOST: 'localhost',
		CACHE_PORT: 6379,
		GCP_OAUTH_CLIENT_ID: '',
		GCP_OAUTH_CLIENT_SECRET: '',
	},
	production: {
		HOST: 'localhost',
		PORT: 8080,
	},
}

export const newConfig = () => {
	const nodeEnv = Bun.env.NODE_ENV
	if (!nodeEnv) throw new Error('NODE_ENV not set')

	const defaults = environmentDefaults[nodeEnv as Environment]

	// Merge defaults with actual environment variables (env vars take precedence)
	const mergedEnv = { ...defaults, ...Bun.env }

	return schema.parse(mergedEnv)
}
