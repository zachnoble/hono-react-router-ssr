import { ErrorFallback } from '~/components/error-fallback'

const title = '404 Not Found'
const description = 'The page you are looking for no longer exists.'

export const meta = () => [{ title }, { name: 'description', content: description }]

export default function NotFound() {
	return <ErrorFallback title={title} description={description} />
}
