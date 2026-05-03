import { Button } from '~/components/button'
import { ClientOnly } from '~/components/client-only'
import { MoonIcon } from '~/components/icons/outline/moon'
import { SpinnerIcon } from '~/components/icons/outline/spinner'
import { SunIcon } from '~/components/icons/outline/sun'
import { useTheme } from '~/features/themes/hooks/use-theme'

const ToggleThemeContent = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<Button onClick={toggleTheme} variant='outline' isIconOnly>
			{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
		</Button>
	)
}

export const ToggleTheme = () => {
	return (
		<ClientOnly
			fallback={
				<Button variant='outline' isIconOnly>
					<SpinnerIcon />
				</Button>
			}
		>
			{() => <ToggleThemeContent />}
		</ClientOnly>
	)
}
