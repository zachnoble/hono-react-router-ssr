import type { Route } from './+types/_auth.login'
import { confirmLogin, initiateLogin } from '~/features/auth/api.server'
import { ConfirmLoginForm } from '~/features/auth/components/confirm-login-form'
import { InitiateLoginForm } from '~/features/auth/components/initiate-login-form'
import { requireGuest } from '~/features/auth/middleware.server'
import { config } from '~/lib/config.server'
import { getSearchParams } from '~/lib/search-params'
import { toastServerError } from '~/lib/toast'

export const meta = (_: Route.MetaArgs) => [
	{ title: 'Login' },
	{ name: 'description', content: 'Login to your account' },
]

enum Intent {
	InitiateLogin = 'InitiateLogin',
	ConfirmLogin = 'ConfirmLogin',
}

enum Step {
	InitiateLogin = 'InitiateLogin',
	ConfirmLogin = 'ConfirmLogin',
}

export const loader = ({ request, context }: Route.LoaderArgs) => {
	requireGuest(context)

	const { email } = getSearchParams(request)
	if (email) {
		return {
			step: Step.ConfirmLogin as const,
			email,
		}
	}

	const origin = new URL(request.url).origin
	const googleSignInUrl = `${config.API_URL}/auth/sign-in/social?provider=google&callbackURL=${encodeURIComponent(origin)}`
	return {
		step: Step.InitiateLogin as const,
		googleSignInUrl,
	}
}

export const action = async ({ request, context }: Route.ActionArgs) => {
	const formData = await request.formData()
	const intent = formData.get('intent')
	switch (intent) {
		case Intent.InitiateLogin:
			return initiateLogin(context, formData)
		case Intent.ConfirmLogin:
			return confirmLogin(context, formData)
		default:
			return toastServerError(context, 'Unsupported action')
	}
}

export default function Login({ loaderData }: Route.ComponentProps) {
	if (loaderData.step === Step.ConfirmLogin) {
		return <ConfirmLoginForm intent={Intent.ConfirmLogin} email={loaderData.email} />
	}

	return (
		<InitiateLoginForm
			intent={Intent.InitiateLogin}
			googleSignInUrl={loaderData.googleSignInUrl}
		/>
	)
}
