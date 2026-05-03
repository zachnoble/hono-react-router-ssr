import { createMiddleware } from 'hono/factory'

import type { User } from '~/db/schemas/user'
import { UnauthorizedError } from '~/lib/errors'

type Context = {
	Variables: {
		user: User
	}
}

export const authenticate = () => {
	return createMiddleware<Context>(async (c, next) => {
		const { authClient, logger } = c.var

		const session = await authClient.api.getSession({
			headers: c.req.raw.headers,
		})

		if (!session?.user) throw new UnauthorizedError('Session not found')

		c.set('user', session.user as User)

		logger.info(`Authenticated user id: ${session.user.id} email: ${session.user.email}`)

		await next()
	})
}
