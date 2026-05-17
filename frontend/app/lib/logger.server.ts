import pino, { type LoggerOptions } from 'pino'

import { config, type Environment } from './config.server'

const developmentOptions: LoggerOptions = {
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
}

const productionOptions: LoggerOptions = {}

const options: Record<Environment, LoggerOptions> = {
	development: developmentOptions,
	production: productionOptions,
}

const stream = pino.destination({ sync: false })

export const logger = pino(options[config.NODE_ENV], stream)
