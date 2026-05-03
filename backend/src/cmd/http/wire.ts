import { newDB } from '~/db'
import { newConfig } from '~/lib/config'
import { newEmailClient } from '~/lib/email'
import { newLogger } from '~/lib/logger'
import { newHTTPServer } from '~/server'
import { newHealthRoutes } from '~/server/routes/health'
import { newAuthClient } from '~/services/auth/auth-client'

export const wireHttpServer = () => {
	// infra
	const config = newConfig()
	const logger = newLogger(config)
	const db = newDB(config)
	const emailClient = newEmailClient(config)
	const authClient = newAuthClient({ config, db, emailClient })

	// routes
	const healthRoutes = newHealthRoutes()

	// http server
	const httpServer = newHTTPServer({ config, logger, authClient, healthRoutes })

	return { httpServer, config, logger }
}
