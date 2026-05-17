import { navItems } from '../nav-items'
import { MoreMenu } from './more-menu'
import { NavLink } from './nav-link'
import { Button } from '~/components/button'
import { LogoIcon } from '~/components/icons/outline/logo'
import { PlusIcon } from '~/components/icons/outline/plus'
import type { User } from '~/features/auth/types'

type Props = {
	user: User | null
}

export const Sidebar = ({ user }: Props) => {
	return (
		<div className='sticky top-0 hidden h-dvh w-20 flex-col justify-between p-4.5 md:flex lg:w-60 lg:p-5.5'>
			<div>
				<div className='flex justify-center lg:justify-start'>
					<LogoIcon className='text-accent size-9' />
				</div>
				<div className='flex flex-col gap-2 py-6.5'>
					{navItems.map((item) => (
						<div key={item.to} className='lg:hidden'>
							<NavLink {...item} iconOnly />
						</div>
					))}
					{navItems.map((item) => (
						<div key={item.to} className='hidden lg:block'>
							<NavLink {...item} />
						</div>
					))}
				</div>
				<div className='flex justify-center lg:justify-start'>
					<Button className='hidden w-full lg:flex'>Create</Button>
					<Button variant='solid' className='p-1.5 lg:hidden'>
						<PlusIcon className='size-5' />
					</Button>
				</div>
			</div>
			{user && (
				<div>
					<MoreMenu />
				</div>
			)}
		</div>
	)
}
