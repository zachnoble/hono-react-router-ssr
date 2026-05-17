import { Link, useFetcher } from 'react-router'

import { useMenu } from '../hooks/use-menu'
import { navItems } from '../nav-items'
import { NavLink } from './nav-link'
import { Button } from '~/components/button'
import { LogoIcon } from '~/components/icons/outline/logo'
import { XIcon } from '~/components/icons/outline/x'
import { MenuIcon } from '~/components/icons/solid/menu'
import type { User } from '~/features/auth/types'

type Props = {
	user: User | null
}

export const MobileNav = ({ user }: Props) => {
	const { open, setOpen } = useMenu()
	const logoutFetcher = useFetcher()

	return (
		<>
			<div className='bg-background fixed top-0 right-0 left-0 z-30 flex items-center justify-between px-4 py-3 md:hidden'>
				<LogoIcon className='text-accent size-9' />
				<button
					onClick={() => setOpen(true)}
					className='rounded-lg p-1'
					aria-label='Open navigation'
				>
					<MenuIcon className='text-muted size-6' />
				</button>
			</div>

			{open && (
				<div className='fixed inset-0 z-40 md:hidden'>
					<div className='bg-background absolute inset-0 flex flex-col'>
						<div className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
							<div className='mb-6 flex items-center justify-between px-4 py-3'>
								<LogoIcon className='text-accent size-9' />
								<button
									onClick={() => setOpen(false)}
									className='rounded-lg p-1'
									aria-label='Close navigation'
								>
									<XIcon className='text-muted size-5' />
								</button>
							</div>
							<div className='flex flex-col gap-2 px-4'>
								{navItems.map((item) => (
									<NavLink
										key={item.to}
										{...item}
										onClick={() => setOpen(false)}
									/>
								))}
							</div>
						</div>
						<div className='flex shrink-0 flex-col gap-4 px-4 pb-5.5'>
							<Button className='w-full'>Create</Button>
							{user ? (
								<Button
									variant='outline'
									className='w-full'
									isPending={logoutFetcher.state !== 'idle'}
									onPress={async () => {
										await logoutFetcher.submit(
											{},
											{ method: 'post', action: '/logout' },
										)
										setOpen(false)
									}}
								>
									Logout
								</Button>
							) : (
								<Button asChild variant='outline'>
									<Link to='/login' className='w-full'>
										Login
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
