import { eq } from 'drizzle-orm'

import { DB } from '~/db'
import { user } from '~/db/schemas/user'
import { ormify } from '~/lib/ormify'

export type UserDal = ReturnType<typeof newUserDal>

export const newUserDal = (db: DB) => {
	const base = ormify(db, user)

	const getByEmail = async (email: string) => {
		const [u] = await db.select().from(user).where(eq(user.email, email)).limit(1)
		return u
	}

	return {
		...base,
		getByEmail,
	}
}
