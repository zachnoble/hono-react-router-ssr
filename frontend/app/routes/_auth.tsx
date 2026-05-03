import { Link, Outlet } from 'react-router'

import { Button } from '~/components/button'
import { ChevronLeftIcon } from '~/components/icons/outline/chevron-left'

export default function AuthLayout() {
	return (
		<div className='flex min-h-dvh w-full items-center justify-center py-0 sm:py-16'>
			<div className='mx-auto w-screen sm:max-w-118.75'>
				<div className='absolute top-3 left-3 sm:top-5 sm:left-5'>
					<Button asChild variant='plain'>
						<Link to='/'>
							<div className='flex items-center gap-2 pr-1.5'>
								<ChevronLeftIcon /> Home
							</div>
						</Link>
					</Button>
				</div>
				<div className='bg-background sm:dark:bg-muted/2 rounded-none border-0 p-8 sm:rounded-sm sm:border sm:p-12'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
