import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { getToast, toastMiddleware } from 'remix-toast/middleware'
import { twMerge } from 'tailwind-merge'

import './main.css'
import type { Route } from './+types/root'
import { ErrorFallback } from './components/error-fallback'
import { NavProgress } from './components/nav-progress'
import { Toaster } from './components/toaster'
import { authMiddleware } from './features/auth/middleware.server'
import { PreventFlashOnWrongTheme } from './features/themes/components/prevent-flash'
import { ThemeProvider } from './features/themes/context'
import { useTheme } from './features/themes/hooks/use-theme'
import { themeSessionResolver } from './features/themes/session.server'
import { apiClientMiddleware } from './lib/api.server'

export const meta = (_: Route.MetaArgs) => [
	{ charSet: 'utf-8' },
	{ title: 'App Name' },
	{ name: 'description', content: 'App Description' },
	{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
]

export const middleware = [apiClientMiddleware(), authMiddleware(), toastMiddleware()]

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const { getTheme } = await themeSessionResolver(request)

	return {
		theme: getTheme(),
		toast: getToast(context),
	}
}

const Document = ({
	className,
	headSlot,
	bodySlot,
}: {
	className?: string
	headSlot?: ReactNode
	bodySlot?: ReactNode
}) => {
	return (
		<html lang='en' className={className}>
			<head>
				<Meta />
				<Links />
				{headSlot}
			</head>
			<body>
				{bodySlot}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export const ErrorBoundary = () => {
	return (
		<Document
			className='dark'
			headSlot={<title>Unexpected Error</title>}
			bodySlot={
				<ErrorFallback
					title='Something went wrong...'
					description='An unexpected error occured. Please try refreshing the page.'
				/>
			}
		/>
	)
}

const App = ({ loaderData: { toast } }: Route.ComponentProps) => {
	const { theme } = useTheme()

	return (
		<Document
			className={twMerge(theme)}
			headSlot={<PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />}
			bodySlot={
				<>
					<NavProgress />
					<Toaster toastData={toast} />
					<Outlet />
				</>
			}
		/>
	)
}

export default function Root(props: Route.ComponentProps) {
	const {
		loaderData: { theme },
	} = props

	return (
		<ThemeProvider specifiedTheme={theme}>
			<App {...props} />
		</ThemeProvider>
	)
}
