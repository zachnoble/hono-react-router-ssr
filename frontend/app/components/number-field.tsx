import {
	Group,
	type InputProps,
	NumberField as RACNumberField,
	type NumberFieldProps as RACNumberFieldProps,
} from 'react-aria-components'

import { Button } from './button'
import { FieldInput } from './field'
import { MinusIcon } from './icons/outline/minus'
import { PlusIcon } from './icons/outline/plus'
import { Separator } from './separator'
import { composeTailwindRenderProps, inputField } from './utils'

export interface NumberFieldProps extends RACNumberFieldProps {}

export const NumberField = (props: NumberFieldProps) => {
	return (
		<RACNumberField
			{...props}
			className={composeTailwindRenderProps(props.className, inputField)}
		/>
	)
}

export const NumberInput = (props: InputProps) => {
	return (
		<Group
			data-ui='control'
			className={[
				'group isolate grid grid-cols-[auto_auto_1fr_auto_auto]',
				'[&>div:has([role=separator])]:h-full',
				'[&>div:has([role=separator])]:z-10',
				'[&>div:has([role=separator])]:py-px',
				'[&:focus-within>div:has([role=separator])]:py-0.5',
			].join(' ')}
		>
			<Button
				slot='decrement'
				isIconOnly
				variant='plain'
				className='pressed:bg-transparent text-muted hover:text-foreground z-10 col-start-1 row-start-1 rounded-none hover:bg-transparent'
			>
				<MinusIcon />
			</Button>
			<div className='col-start-2 row-start-1'>
				<Separator orientation='vertical' className='h-full' />
			</div>

			<FieldInput
				{...props}
				className={composeTailwindRenderProps(props.className, [
					'z-0',
					'col-span-full',
					'row-start-1',
					'px-[calc(theme(size.11)+10px)] sm:px-[calc(theme(size.9)+10px)]',
				])}
			/>

			<div className='-col-end-2 row-start-1'>
				<Separator orientation='vertical' className='h-full' />
			</div>

			<Button
				slot='increment'
				className='pressed:bg-transparent text-muted hover:text-foreground -col-end-1 row-start-1 rounded-none hover:bg-transparent'
				isIconOnly
				variant='plain'
			>
				<PlusIcon />
			</Button>
		</Group>
	)
}
