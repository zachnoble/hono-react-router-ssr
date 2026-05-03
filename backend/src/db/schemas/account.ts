import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

import { defaultColumns } from '../utils'
import { user } from './user'

export const account = pgTable('account', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => nanoid()),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'), // betterauth stores a hash
	...defaultColumns(),
})

export type Account = typeof account.$inferSelect
