import { boolean, pgTable, text } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

import { defaultColumns } from '../utils'

export const user = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull().default(false),
	image: text('image'),
	...defaultColumns(),
})

export type User = typeof user.$inferSelect
