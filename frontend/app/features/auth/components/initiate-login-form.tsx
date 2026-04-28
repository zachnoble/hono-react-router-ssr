import { getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { useFetcher } from 'react-router'

import { initiateLoginFormSchema } from '../schemas'
import { Button } from '~/components/button'
import { Input } from '~/components/input'

export const InitiateLoginForm = () => {
	const fetcher = useFetcher()
	const submitting = fetcher.state === 'submitting'

	const [form, fields] = useForm({
		lastResult: fetcher.data,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: initiateLoginFormSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<fetcher.Form
			method='post'
			id={form.id}
			onSubmit={form.onSubmit}
			className='flex flex-col gap-4'
		>
			<Input
				{...getInputProps(fields.email, { type: 'email' })}
				placeholder='Enter your email'
				errorMessage={fields.email.errors?.[0]}
			/>
			<Button
				type='submit'
				isPending={submitting}
				isDisabled={submitting}
				name='intent'
				value='initiate-login'
			>
				Continue with email
			</Button>
		</fetcher.Form>
	)
}
