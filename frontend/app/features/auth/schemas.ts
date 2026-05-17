import z from 'zod'

export const confirmLoginFormSchema = z.object({
	email: z.email(),
	code: z.string('Please enter your verification code').length(6, 'Code must be 6 digits'),
})

export const initiateLoginFormSchema = z.object({
	email: z.email('Please enter a valid email address'),
})
