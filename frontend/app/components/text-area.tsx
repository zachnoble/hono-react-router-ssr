import { FieldError, FieldTextArea, TextField } from './field'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	description?: string
	error?: string
}

export const TextArea = ({ label, description: _description, error, ...props }: TextAreaProps) => {
	return (
		<TextField isInvalid={Boolean(error)} aria-label={label}>
			<FieldTextArea {...props} />
			<FieldError>{error}</FieldError>
		</TextField>
	)
}
