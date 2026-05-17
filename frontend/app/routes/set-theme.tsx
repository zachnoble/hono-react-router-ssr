import { data } from 'react-router'

import type { Route } from './+types/set-theme'
import { themeSessionResolver } from '~/features/themes/session.server'
import { isTheme } from '~/features/themes/utils'
import { noLoader } from '~/lib/loaders'

export const action = async ({ request }: Route.ActionArgs) => {
	const session = await themeSessionResolver(request)
	const { theme } = await request.json()

	if (!theme) return data(null, { headers: { 'Set-Cookie': await session.destroy() } })

	if (!isTheme(theme)) return data({ error: `${theme} is not a valid theme` })

	session.setTheme(theme)

	return data(null, {
		headers: {
			'Set-Cookie': await session.commit(),
		},
	})
}

export const loader = noLoader
