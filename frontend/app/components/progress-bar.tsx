import {
	ProgressBar as AriaProgressBar,
	type ProgressBarProps as AriaProgressBarProps,
} from 'react-aria-components'

import { Label } from './field'
import { composeTailwindRenderProps } from './utils'

export interface ProgressBarProps extends AriaProgressBarProps {
	label?: string
}

export const ProgressBar = ({ label, ...props }: ProgressBarProps) => {
	return (
		<AriaProgressBar
			{...props}
			className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1')}
		>
			{({ percentage, valueText, isIndeterminate }) => (
				<>
					<div className='flex justify-between gap-2'>
						<Label>{label}</Label>
						<span className='text-muted text-sm'>{valueText}</span>
					</div>
					<div className='relative h-2 w-64 overflow-hidden rounded-full bg-gray-300 outline -outline-offset-1 outline-transparent dark:bg-zinc-700'>
						<div
							className={`bg-accent absolute top-0 h-full rounded-full ${isIndeterminate ? 'slide-in-from-left-80 repeat-infinite animate-in left-full duration-1000 ease-out' : 'left-0'}`}
							style={{ width: `${isIndeterminate ? 40 : percentage}%` }}
						/>
					</div>
				</>
			)}
		</AriaProgressBar>
	)
}
