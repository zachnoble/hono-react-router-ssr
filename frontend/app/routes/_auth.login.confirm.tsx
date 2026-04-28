import { Link, redirect } from 'react-router'

import type { Route } from './+types/_auth.login.confirm'
import { Button } from '~/components/button'
import { EmailIcon } from '~/components/icons/outline/email'
import { confirmLogin } from '~/features/auth/api.server'
import { ConfirmLoginForm } from '~/features/auth/components/confirm-login-form'
import { getSearchParams } from '~/lib/search-params'

export const meta = (_: Route.MetaArgs) => [
	{ title: 'Confirm Email' },
	{ name: 'description', content: 'Enter your verification code' },
]

export const action = async ({ request, context }: Route.ActionArgs) => {
	const formData = await request.formData()
	const intent = formData.get('intent')
	switch (intent) {
		case 'confirm-login':
			return confirmLogin(context, formData)
		default:
			return null
	}
}

export const loader = ({ request }: Route.LoaderArgs) => {
	const { email } = getSearchParams(request)
	if (!email) return redirect('/login')
	return { email }
}

export default function ConfirmLogin({ loaderData: { email } }: Route.ComponentProps) {
	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<EmailIcon className='size-9' />
			<h1 className='py-2 text-xl font-bold'>Check your email</h1>
			<p className='text-muted pb-4 text-center text-sm'>We sent a code to {email}</p>
			<ConfirmLoginForm email={email} />
			<div className='mt-4'>
				<Button asChild variant='link'>
					<Link to='/login'>Use a different email address</Link>
				</Button>
			</div>
		</div>
	)
}
