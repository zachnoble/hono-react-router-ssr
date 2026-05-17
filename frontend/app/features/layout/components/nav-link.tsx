import { ComponentType, SVGProps } from 'react'
import { Link, useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { Button } from '~/components/button'

type Props = {
	label: string
	to: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
	iconOnly?: boolean
	onClick?: () => void
}

export const NavLink = ({ label, to, icon: Icon, iconOnly, onClick }: Props) => {
	const { pathname } = useLocation()
	const active = to === '/' ? pathname === '/' : pathname.startsWith(to)

	return (
		<Button asChild variant='plain'>
			<Link
				to={to}
				onClick={onClick}
				className={twMerge(
					'flex w-full items-center gap-3.5 rounded-lg p-3',
					iconOnly ? 'justify-center' : 'justify-start',
					active && 'bg-subtle',
				)}
			>
				<Icon
					className={twMerge(
						'size-5 shrink-0',
						active ? 'text-foreground' : 'text-muted',
					)}
				/>
				{!iconOnly && (
					<p
						className={twMerge(
							'font-medium',
							active ? 'text-foreground' : 'text-muted',
						)}
					>
						{label}
					</p>
				)}
			</Link>
		</Button>
	)
}
