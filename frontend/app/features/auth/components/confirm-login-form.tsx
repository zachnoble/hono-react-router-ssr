import { getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { useFetcher } from 'react-router'

import { confirmLoginFormSchema } from '../schemas'
import { Button } from '~/components/button'
import { Input } from '~/components/input'

type Props = {
	email: string
}

export const ConfirmLoginForm = ({ email }: Props) => {
	const fetcher = useFetcher()
	const submitting = fetcher.state === 'submitting'

	const [form, fields] = useForm({
		lastResult: fetcher.data,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: confirmLoginFormSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<fetcher.Form
			method='post'
			id={form.id}
			onSubmit={form.onSubmit}
			className='flex w-full flex-col gap-4'
		>
			<input {...getInputProps(fields.email, { type: 'hidden' })} value={email} />
			<Input
				{...getInputProps(fields.code, { type: 'text' })}
				placeholder='Enter verification code'
				errorMessage={fields.code.errors?.[0]}
				autoComplete='one-time-code'
			/>
			<Button
				type='submit'
				isPending={submitting}
				isDisabled={submitting}
				name='intent'
				value='confirm-login'
			>
				Verify your email address
			</Button>
		</fetcher.Form>
	)
}
