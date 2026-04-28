import { Route } from './+types/_app'
import { requireAuth } from '~/features/auth/middleware.server'

export const loader = ({ context }: Route.LoaderArgs) => {
	return requireAuth(context)
}
