import { getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { useFetcher } from 'react-router'
import { Link } from 'react-router'

import { confirmLoginFormSchema } from '../schemas'
import { Button } from '~/components/button'
import { EmailIcon } from '~/components/icons/outline/email'
import { Input } from '~/components/input'

type Props = {
	email: string
	intent: string
}

export const ConfirmLoginForm = ({ email, intent }: Props) => {
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
		<div className='flex w-full flex-col items-center justify-center'>
			<EmailIcon className='size-9' />
			<h1 className='py-2 text-xl font-bold'>Check your email</h1>
			<p className='text-muted pb-4 text-center text-sm'>We sent a code to {email}</p>
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
					value={intent}
				>
					Verify your email address
				</Button>
			</fetcher.Form>
			<div className='mt-4'>
				<Button asChild variant='link'>
					<Link to='/login'>Use a different email address</Link>
				</Button>
			</div>
		</div>
	)
}
