import { Link, useFetcher } from 'react-router'

import type { Route } from './+types/_index'
import { Button } from '~/components/button'
import { getUser } from '~/features/auth/middleware.server'
import { ToggleTheme } from '~/features/themes/components/toggle-theme'

export const loader = ({ context }: Route.LoaderArgs) => {
	const user = getUser(context)

	return {
		user,
	}
}

export default function Home({ loaderData: { user } }: Route.ComponentProps) {
	const logoutFetcher = useFetcher()
	const isLoading = logoutFetcher.state !== 'idle'

	return (
		<div className='flex min-h-dvh w-full items-center justify-center'>
			<div className='flex w-full max-w-125 flex-col gap-4 px-6'>
				<div>
					<ToggleTheme />
				</div>
				{!user && (
					<Button asChild variant='solid'>
						<Link to='/login'>Login</Link>
					</Button>
				)}
				{user && (
					<logoutFetcher.Form method='post' action='/logout'>
						<Button
							type='submit'
							className='w-full'
							isDisabled={isLoading}
							isPending={isLoading}
						>
							Logout
						</Button>
					</logoutFetcher.Form>
				)}
			</div>
		</div>
	)
}
