import { Link } from 'react-router'

import { Button } from '~/components/button'
import { Card } from '~/components/card'
import { LogoIcon } from '~/components/icons/outline/logo'
import { SearchIcon } from '~/components/icons/outline/search'
import { Input } from '~/components/input'
import type { User } from '~/features/auth/types'

type Props = {
	user: User | null
}

export const RightPanel = ({ user }: Props) => {
	return (
		<div className='sticky top-0 hidden h-dvh w-80 p-5.5 md:block lg:w-105'>
			<div className='mb-4'>
				<Input placeholder='Search...' icon={SearchIcon} />
			</div>
			{!user && (
				<Card className='flex flex-col items-center'>
					<LogoIcon className='text-accent size-9' />
					<div className='mt-4 mb-5 text-center'>
						<p className='text-xl font-bold'>Login or sign up</p>
						<p className='text-muted mt-1 text-center text-sm'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit nam tincidunt
							lectus.
						</p>
					</div>
					<div className='flex w-full flex-col gap-3'>
						<Button asChild variant='solid'>
							<Link to='/login' className='w-full'>
								Login
							</Link>
						</Button>
						<Button asChild variant='outline'>
							<Link to='/explore' className='w-full'>
								Explore more
							</Link>
						</Button>
					</div>
				</Card>
			)}
		</div>
	)
}
