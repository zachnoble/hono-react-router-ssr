import React from 'react'
import {
	composeRenderProps,
	type FieldErrorProps,
	GroupContext,
	type InputProps,
	LabelContext,
	type LabelProps,
	FieldError as RACFieldError,
	Input as RACInput,
	Label as RACLabel,
	Text as RACText,
	TextArea as RACTextArea,
	type TextAreaProps as RACTextAreaProps,
	TextField as RACTextField,
	type TextFieldProps as RACTextFieldProps,
	type TextProps,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Text } from './text'
import { type DisplayLevel, displayLevels, inputField } from './utils'

export const LabeledGroup = ({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) => {
	const labelId = React.useId()

	return (
		<LabelContext.Provider value={{ id: labelId, elementType: 'span' }}>
			<GroupContext.Provider value={{ 'aria-labelledby': labelId }}>
				<div
					className={twMerge(
						['[&>[data-ui=label]:first-of-type:not([class*=mb])]:mb-2'],
						className,
					)}
				>
					{children}
				</div>
			</GroupContext.Provider>
		</LabelContext.Provider>
	)
}

export const Label = ({
	requiredHint: _requiredHint,
	hint,
	displayLevel = 3,
	children,
	...props
}: LabelProps & {
	requiredHint?: boolean
	hint?: 'required' | 'optional'
	displayLevel?: DisplayLevel
}) => {
	return (
		<RACLabel
			{...props}
			data-ui='label'
			className={twMerge(
				'inline-block min-w-max text-pretty',
				'group-disabled:opacity-50',
				displayLevels[displayLevel],
				hint === 'required' && "after:ms-0.5 after:text-red-600 after:content-['*']",
				props.className,
			)}
		>
			{children}
			{hint === 'optional' && (
				<span className='text-muted ms-auto ps-0.5 font-normal'>Optional</span>
			)}
		</RACLabel>
	)
}

export const DescriptionContext = React.createContext<{
	'aria-describedby'?: string
} | null>(null)

export const DescriptionProvider = ({ children }: { children: React.ReactNode }) => {
	const descriptionId: string | null = React.useId()
	const [descriptionRendered, setDescriptionRendered] = React.useState(true)

	React.useLayoutEffect(() => {
		if (!document.getElementById(descriptionId)) {
			setDescriptionRendered(false)
		}
	}, [descriptionId])

	return (
		<DescriptionContext.Provider
			value={{
				'aria-describedby': descriptionRendered ? descriptionId : undefined,
			}}
		>
			{children}
		</DescriptionContext.Provider>
	)
}

export const Description = ({ className, ...props }: TextProps) => {
	const describedby = React.useContext(DescriptionContext)?.['aria-describedby']

	return describedby ? (
		<Text
			{...props}
			id={describedby}
			data-ui='description'
			className={twMerge('block group-disabled:opacity-50', className)}
		/>
	) : (
		<RACText
			{...props}
			data-ui='description'
			slot='description'
			className={twMerge(
				'block text-pretty text-base/6 text-muted sm:text-sm/6',
				'group-disabled:opacity-50',
				className,
			)}
		/>
	)
}

export const TextField = (props: RACTextFieldProps) => {
	return (
		<RACTextField
			{...props}
			data-ui='text-field'
			className={composeRenderProps(props.className, (className) =>
				twMerge(inputField, className),
			)}
		/>
	)
}

export const FieldError = (props: FieldErrorProps) => {
	return (
		<RACFieldError
			{...props}
			data-ui='errorMessage'
			className={composeRenderProps(props.className, (className) =>
				twMerge('block text-base/6 text-red-600 sm:text-sm/6', className),
			)}
		/>
	)
}

export const FieldInput = (props: InputProps) => {
	return (
		<RACInput
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) => {
				return twMerge(
					'w-full rounded-md border border-input shadow-xs outline-hidden',
					'px-3 py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
					'text-base/6 placeholder:text-muted sm:text-sm/6',
					'dark:shadow-none [[readonly]]:bg-zinc-800/5 dark:[[readonly]]:bg-white/10',
					renderProps.isDisabled && 'opacity-50',
					renderProps.isInvalid && 'border-red-600',
					renderProps.isFocused
						? 'border-ring ring-1 ring-ring'
						: '[[readonly]]:border-transparent',
					className,
				)
			})}
		/>
	)
}

export const FieldTextArea = (props: RACTextAreaProps) => {
	return (
		<RACTextArea
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				twMerge(
					'w-full rounded-md border border-input px-3 py-1 shadow-xs outline-hidden',
					'text-base/6 placeholder:text-muted sm:text-sm/6',
					'[[readonly]]:bg-zinc-800/5 dark:[[readonly]]:bg-white/10',
					renderProps.isDisabled && 'opacity-50',
					renderProps.isInvalid && 'border-red-600',
					renderProps.isFocused
						? 'border-ring ring-1 ring-ring'
						: '[[readonly]]:border-transparent',
					className,
				),
			)}
		/>
	)
}
