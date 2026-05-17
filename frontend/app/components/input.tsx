import { ComponentType, SVGProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { FieldError, FieldInput, TextField } from './field'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	description?: string
	errorMessage?: string
	icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const Input = ({
	label,
	description: _description,
	errorMessage,
	icon: Icon,
	...props
}: InputProps) => {
	return (
		<TextField isInvalid={Boolean(errorMessage)} aria-label={label ?? props.placeholder}>
			{Icon ? (
				<div className='relative'>
					<Icon className='text-muted pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2' />
					<FieldInput {...props} className={twMerge('pl-8', props.className as string)} />
				</div>
			) : (
				<FieldInput {...props} />
			)}
			<FieldError>{errorMessage}</FieldError>
		</TextField>
	)
}
