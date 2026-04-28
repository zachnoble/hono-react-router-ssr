import type { Logger } from 'pino'

import type { Config } from '~/lib/config'
import { AuthClient } from '~/services/auth/auth-client'

declare module 'hono' {
	interface ContextVariableMap {
		config: Config
		logger: Logger
		authClient: AuthClient
	}
}
