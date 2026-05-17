import { toast as reactHotToast } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

import { XIcon } from '~/components/icons/outline/x'
import { CheckCircleIcon } from '~/components/icons/solid/check-circle'
import { ExclamationTriangleIcon } from '~/components/icons/solid/exclamation-triangle'
import { InformationCircleIcon } from '~/components/icons/solid/information-circle'
import { XCircleIcon } from '~/components/icons/solid/x-circle'

export type ToastType = {
	type?: 'success' | 'error' | 'info' | 'warning'
	title?: string
	message: string
}

const baseIconClassName = 'size-6'

const toastConfig = {
	success: {
		icon: <CheckCircleIcon className={twMerge(baseIconClassName, 'text-green-400')} />,
		title: 'Success',
	},
	error: {
		icon: <XCircleIcon className={twMerge(baseIconClassName, 'text-red-400')} />,
		title: 'Error',
	},
	info: {
		icon: <InformationCircleIcon className={twMerge(baseIconClassName, 'text-rose-400')} />,
		title: 'Info',
	},
	warning: {
		icon: <ExclamationTriangleIcon className={twMerge(baseIconClassName, 'text-yellow-500')} />,
		title: 'Warning',
	},
}

type Props = {
	toast: ToastType & { id: string }
}

export const Toast = ({ toast }: Props) => {
	const { type = 'info', title, message, id } = toast

	return (
		<div className='fade-in animate-in border-border/80 bg-background pointer-events-auto rounded-md border duration-300'>
			<div className='flex h-full items-center'>
				<div className='flex items-center px-3 py-2.5'>
					<div>{toastConfig[type].icon}</div>
					<div className='mx-3 max-w-68.75 min-w-52.5'>
						<p className='pb-0.5 text-sm font-medium'>
							{title ?? toastConfig[type].title}
						</p>
						<p className='text-muted text-xs'>{message}</p>
					</div>
				</div>

				<button
					type='button'
					onClick={() => reactHotToast.remove(id)}
					className='text-muted hover:bg-muted/3 mr-2 rounded-[50%] p-2.5 text-xs font-medium'
				>
					<XIcon className='size-3.5' />
				</button>
			</div>
		</div>
	)
}
