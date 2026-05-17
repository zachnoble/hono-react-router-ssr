import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

import { defaultColumns } from '../utils'

export const verification = pgTable('verification', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => nanoid()),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	...defaultColumns(),
})

export type Verification = typeof verification.$inferSelect
