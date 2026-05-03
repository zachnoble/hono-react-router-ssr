import { cors } from 'hono/cors'

import { Config } from '~/lib/config'

export const corsMiddleware = (config: Config) => {
	return cors({
		origin: config.FRONTEND_URL,
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		credentials: true,
	})
}
