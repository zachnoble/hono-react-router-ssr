import { twMerge } from 'tailwind-merge'

type Props = {
	children: React.ReactNode
	className?: string
}

export const Card = ({ children, className }: Props) => {
	return (
		<div className={twMerge('dark:bg-subtle overflow-hidden rounded-sm border p-5', className)}>
			{children}
		</div>
	)
}
