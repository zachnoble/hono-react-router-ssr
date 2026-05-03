import { wireHttpServer } from './wire'

const {
	httpServer: { fetch },
	config: { PORT: port },
	logger,
} = wireHttpServer()

Bun.serve({ port, fetch })

logger.info(`HTTP server listening on localhost:${port}...`)
