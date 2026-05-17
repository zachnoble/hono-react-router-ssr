import { Hono } from 'hono'

export type HealthRoutes = ReturnType<typeof newHealthRoutes>

export const newHealthRoutes = () => {
	return new Hono().get('/health', (c) => c.text('Service running.'))
}
