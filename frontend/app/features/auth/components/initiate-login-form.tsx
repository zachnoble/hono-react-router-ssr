import { getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import { useFetcher } from 'react-router'

import { initiateLoginFormSchema } from '../schemas'
import { GoogleAuthButton } from './google-auth-button'
import { Button } from '~/components/button'
import { Input } from '~/components/input'

type Props = {
	intent: string
	googleSignInUrl: string
}

export const InitiateLoginForm = ({ intent, googleSignInUrl }: Props) => {
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
		<>
			<div className='mb-8 text-center'>
				<h1 className='text-2xl font-bold'>Get Started</h1>
				<p className='text-muted mt-2 text-sm'>Enter your email for a sign-in code</p>
			</div>
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
					value={intent}
				>
					Continue with email
				</Button>
			</fetcher.Form>
			<div className='my-4 flex items-center'>
				<div className='flex-1 border-t' />
				<span className='text-muted mx-4 text-sm'>or</span>
				<div className='flex-1 border-t' />
			</div>
			<GoogleAuthButton signInUrl={googleSignInUrl} />
		</>
	)
}
