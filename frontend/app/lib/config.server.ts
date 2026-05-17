import { z } from 'zod'

export type Config = z.infer<typeof schema>
export type Environment = Config['NODE_ENV']

const schema = z.object({
	NODE_ENV: z.enum(['development', 'production']),

	PORT: z.coerce.number(),
	API_URL: z.string().min(1),

	// Signature for signing cookies
	SIGNATURE: z.string().min(1),
})

// Environment-specific defaults
const environmentDefaults: Record<Environment, Partial<Config>> = {
	development: {
		PORT: 5173,
		API_URL: 'http://localhost:8080',
		SIGNATURE: 'development-signature',
	},
	production: {},
}

export const config = (() => {
	const nodeEnv = Bun.env.NODE_ENV
	if (!nodeEnv) throw new Error('NODE_ENV not set')

	const defaults = environmentDefaults[nodeEnv as Environment]

	// Merge defaults with actual environment variables (env vars take precedence)
	const mergedEnv = { ...defaults, ...Bun.env }
	const parsedEnv = schema.parse(mergedEnv)

	return parsedEnv
})()
