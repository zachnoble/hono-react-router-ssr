import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { Config } from '~/lib/config'

export const newDB = (config: Config) => {
	return drizzle(postgres(config.DB_URL))
}

export type DB = ReturnType<typeof newDB>

export type Transaction = Parameters<Parameters<DB['transaction']>[0]>[0]
