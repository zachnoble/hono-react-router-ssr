import { UserDal } from './user-dal'
import { User } from '~/db/schemas/user'

type Dependencies = {
	userDal: UserDal
}

export type UserService = ReturnType<typeof newUserService>

export const newUserService = ({ userDal }: Dependencies) => {
	const createUser = async (user: User) => {
		return await userDal.create(user)
	}

	return {
		createUser,
	}
}
