import { Hono } from 'hono'
import type { Logger } from 'pino'

import { corsMiddleware } from './middleware/cors'
import { errorHandler } from './middleware/error-handler'
import { injectionMiddleware } from './middleware/injection'
import { loggerMiddleware } from './middleware/logger'
import type { HealthRoutes } from './routes/health'
import type { Config } from '~/lib/config'
import type { AuthClient } from '~/services/auth/auth-client'

type Dependencies = {
	config: Config
	logger: Logger
	authClient: AuthClient
	healthRoutes: HealthRoutes
}

export const newHTTPServer = ({ config, logger, authClient, healthRoutes }: Dependencies) => {
	const app = new Hono()

	// inject dependencies for middleware
	app.use(injectionMiddleware(config, logger, authClient))

	// log all requests
	app.use(loggerMiddleware)

	// enforce cors
	app.use(corsMiddleware(config))

	// global error handler
	app.onError(errorHandler)

	// auth
	app.on(['GET', 'POST'], '/auth/*', (c) => authClient.handler(c.req.raw))

	// routes
	app.route('/', healthRoutes)

	return app
}
