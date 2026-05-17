import { randomUUIDv7 } from 'bun'
import { createMiddleware } from 'hono/factory'
import type { Logger } from 'pino'

import { Config } from '~/lib/config'
import { AuthClient } from '~/services/auth/auth-client'

export const injectionMiddleware = (config: Config, logger: Logger, authClient: AuthClient) => {
	return createMiddleware(async (c, next) => {
		// inject request scoped logger
		c.set('logger', logger.child({ requestId: randomUUIDv7() }))

		// inject config
		c.set('config', config)

		// inject auth
		c.set('authClient', authClient)

		await next()
	})
}
