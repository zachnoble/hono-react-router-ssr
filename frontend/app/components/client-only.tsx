import { type ReactNode, useSyncExternalStore } from 'react'

const subscribe = () => {
	return () => {}
}

const useHydrated = () => {
	return useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	)
}

type Props = {
	children(this: void): ReactNode
	fallback?: ReactNode
}

export const ClientOnly = ({ children, fallback = null }: Props) => {
	return useHydrated() ? children() : fallback
}
