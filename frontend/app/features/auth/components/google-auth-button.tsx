import { Button } from '~/components/button'
import { GoogleIcon } from '~/components/icons/solid/google'

type Props = {
	signInUrl: string
}

export const GoogleAuthButton = ({ signInUrl }: Props) => {
	return (
		<Button asChild variant='outline'>
			<a href={signInUrl} className='w-full'>
				<GoogleIcon className='mr-1 size-5' />
				Continue with Google
			</a>
		</Button>
	)
}
