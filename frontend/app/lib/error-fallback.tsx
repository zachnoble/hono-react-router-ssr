import { Link } from 'react-router'

import { Button } from '~/components/button'

type Props = {
	title: string
	description: string
}

export const ErrorFallback = ({ title, description }: Props) => {
	return (
		<main className='flex min-h-dvh w-screen flex-col items-center justify-center gap-6 py-12'>
			<div className='flex flex-col items-center gap-4 text-center'>
				<h1 className='text-3xl font-bold md:text-6xl'>{title}</h1>
				<p className='text-muted max-w-md text-sm'>{description}</p>
			</div>
			<Button asChild>
				<Link to='/'>Return Home</Link>
			</Button>
		</main>
	)
}
