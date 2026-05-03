import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { AppError } from '~/lib/errors'

export const errorHandler = (err: Error, c: Context) => {
	const { logger } = c.var

	logger.error(err)

	let message = 'An unexpected error occurred.'
	let status = 500

	if (err instanceof AppError || err instanceof HTTPException) {
		status = err.status
		message = err.message
	}

	return c.json(
		{
			message,
		},
		status as ContentfulStatusCode,
	)
}
