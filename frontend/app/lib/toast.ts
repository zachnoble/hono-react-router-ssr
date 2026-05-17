import { createElement } from 'react'
import { toast as reactHotToast } from 'react-hot-toast'
import type { RouterContextProvider } from 'react-router'
import { setToast } from 'remix-toast/middleware'

import { Toast, type ToastType } from '~/components/toast'

export const sendToast = (toast: ToastType) => {
	reactHotToast.custom((t) =>
		createElement(Toast, {
			toast: {
				...toast,
				id: t.id,
			},
		}),
	)
}

export const toastServerError = (
	context: Readonly<RouterContextProvider>,
	error = 'An unexpected error occurred',
) => {
	setToast(context, {
		type: 'error',
		message: error,
	})
}
