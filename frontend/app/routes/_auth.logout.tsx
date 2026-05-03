import type { Route } from './+types/_auth.logout'
import { logout } from '~/features/auth/api.server'
import { noLoader } from '~/lib/loaders'

export const action = async ({ context }: Route.ActionArgs) => {
	return logout(context)
}

export const loader = noLoader
