import { useFetcher, useNavigate } from 'react-router'

import { Button } from '~/components/button'
import { ArrowRightIcon } from '~/components/icons/outline/arrow-right'
import { SettingsIcon } from '~/components/icons/outline/settings'
import { MenuIcon } from '~/components/icons/solid/menu'
import { QuestionMarkCircle } from '~/components/icons/solid/question-mark-circle'
import {
	Menu,
	MenuItem,
	MenuItemLabel,
	MenuPopover,
	MenuSeparator,
	MenuTrigger,
} from '~/components/menu'

export const MoreMenu = () => {
	const navigate = useNavigate()
	const logoutFetcher = useFetcher()

	return (
		<MenuTrigger>
			<Button
				variant='plain'
				className='flex w-full justify-start gap-4 px-2 py-3 md:justify-center lg:justify-start'
			>
				<MenuIcon className='text-muted size-6 shrink-0' />
				<p className='text-muted block md:hidden lg:block'>More</p>
			</Button>
			<MenuPopover placement='top start'>
				<Menu>
					<MenuItem id='settings' onAction={() => navigate('/settings')}>
						<SettingsIcon data-ui='icon' />
						<MenuItemLabel>Settings</MenuItemLabel>
					</MenuItem>
					<MenuItem id='support' onAction={() => navigate('/support')}>
						<QuestionMarkCircle data-ui='icon' />
						<MenuItemLabel>Support</MenuItemLabel>
					</MenuItem>
					<MenuSeparator />
					<MenuItem
						id='signout'
						onAction={() =>
							logoutFetcher.submit({}, { method: 'post', action: '/logout' })
						}
					>
						<ArrowRightIcon data-ui='icon' />
						<MenuItemLabel>Sign out</MenuItemLabel>
					</MenuItem>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	)
}
