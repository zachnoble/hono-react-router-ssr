import { Outlet } from 'react-router'

import { Route } from './+types/_app'
import { getUser } from '~/features/auth/middleware.server'
import { MobileNav } from '~/features/layout/components/mobile-nav'
import { RightPanel } from '~/features/layout/components/right-panel'
import { Sidebar } from '~/features/layout/components/sidebar'

export const loader = ({ context }: Route.LoaderArgs) => {
	const user = getUser(context)

	return { user }
}

export default function AppLayout({ loaderData: { user } }: Route.ComponentProps) {
	return (
		<div className='flex w-full justify-between'>
			<Sidebar user={user} />
			<MobileNav user={user} />
			<div className='mt-14 min-w-0 flex-1 md:mt-0'>
				<Outlet />
			</div>
			<RightPanel user={user} />
		</div>
	)
}
