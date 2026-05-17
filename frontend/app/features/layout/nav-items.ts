import { CalendarIcon } from '~/components/icons/outline/calendar'
import { ChatIcon } from '~/components/icons/outline/chat'
import { EmailIcon } from '~/components/icons/outline/email'
import { HomeIcon } from '~/components/icons/outline/home'
import { SearchIcon } from '~/components/icons/outline/search'
import { SettingsIcon } from '~/components/icons/outline/settings'

export const navItems = [
	{ label: 'Home', to: '/', icon: HomeIcon },
	{ label: 'Search', to: '/search', icon: SearchIcon },
	{ label: 'Mail', to: '/mail', icon: EmailIcon },
	{ label: 'Calendar', to: '/calendar', icon: CalendarIcon },
	{ label: 'Chat', to: '/chat', icon: ChatIcon },
	{ label: 'Settings', to: '/settings', icon: SettingsIcon },
] as const
