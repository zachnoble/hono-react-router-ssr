import pino, { type LoggerOptions } from 'pino'

import type { Config, Environment } from './config'

const testOptions: LoggerOptions = {
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
}

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
	test: testOptions,
}

export const newLogger = (config: Config) => {
	const stream = pino.destination({ sync: false })

	const logger = pino(options[config.NODE_ENV], stream)

	return logger
}
