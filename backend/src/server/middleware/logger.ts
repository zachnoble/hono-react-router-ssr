import { getConnInfo } from 'hono/bun'
import { createMiddleware } from 'hono/factory'
import { getPath } from 'hono/utils/url'

export const loggerMiddleware = createMiddleware(async (c, next) => {
	const { logger } = c.var

	const path = getPath(c.req.raw)
	const method = c.req.method

	const xff = c.req.raw.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
	const ip = xff || getConnInfo(c).remote.address

	logger.info({ ip, method, path }, 'Incoming request')

	const start = performance.now()

	await next()

	const duration = performance.now() - start

	logger.info(
		{
			ip,
			method,
			path,
			status: c.res.status,
			duration: `${duration.toFixed(2)}ms`,
		},
		'Request completed',
	)
})
