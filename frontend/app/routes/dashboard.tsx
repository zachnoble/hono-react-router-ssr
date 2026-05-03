import { Route } from './+types/dashboard'
import { requireAuth } from '~/features/auth/middleware.server'

export const loader = ({ context }: Route.LoaderArgs) => {
	const user = requireAuth(context)

	return {
		user,
	}
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<p>Hello, {loaderData.user.email}.</p>
			<p>This is a protected route</p>
		</div>
	)
}
