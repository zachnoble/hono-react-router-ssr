import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { Config } from '~/lib/config'

export const newDB = (config: Config) => {
	return drizzle(
		new Pool({
			connectionString: config.DB_URL,
		}),
	)
}

export type DB = ReturnType<typeof newDB>

export type Transaction = Parameters<Parameters<DB['transaction']>[0]>[0]
