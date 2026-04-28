import type { Route } from './+types/_auth.login._index'
import { initiateLogin } from '~/features/auth/api.server'
import { GoogleAuthButton } from '~/features/auth/components/google-auth-button'
import { InitiateLoginForm } from '~/features/auth/components/initiate-login-form'
import { config } from '~/lib/config.server'

export const meta = (_: Route.MetaArgs) => [
	{ title: 'Login' },
	{ name: 'description', content: 'Login to your account' },
]

export const loader = ({ request }: Route.LoaderArgs) => {
	const encodedOrigin = encodeURIComponent(new URL(request.url).origin)

	return {
		googleSignInUrl: `${config.API_URL}/api/auth/sign-in/social?provider=google&callbackURL=${encodedOrigin}`,
	}
}

export const action = async ({ request, context }: Route.ActionArgs) => {
	const formData = await request.formData()
	const intent = formData.get('intent')
	switch (intent) {
		case 'initiate-login':
			return initiateLogin(context, formData)
		default:
			return null
	}
}

export default function OTPInitiate({ loaderData: { googleSignInUrl } }: Route.ComponentProps) {
	return (
		<>
			<div className='mb-8 text-center'>
				<h1 className='text-2xl font-bold'>Get Started</h1>
				<p className='text-muted mt-2 text-sm'>Enter your email for a sign-in code</p>
			</div>
			<InitiateLoginForm />
			<div className='my-4 flex items-center'>
				<div className='flex-1 border-t' />
				<span className='text-muted mx-4 text-sm'>or</span>
				<div className='flex-1 border-t' />
			</div>
			<GoogleAuthButton signInUrl={googleSignInUrl} />
		</>
	)
}
