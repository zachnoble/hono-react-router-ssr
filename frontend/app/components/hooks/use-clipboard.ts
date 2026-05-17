import React from 'react'

export const useCopyToClipboard = ({ timeout = 2000 } = {}) => {
	const [error, setError] = React.useState<Error | null>(null)
	const [copied, setCopied] = React.useState(false)
	const [copyTimeout, setCopyTimeout] = React.useState<number | null>(null)

	const handleCopyResult = (value: boolean) => {
		if (copyTimeout) window.clearTimeout(copyTimeout)
		setCopyTimeout(window.setTimeout(() => setCopied(false), timeout))
		setCopied(value)
	}

	const copy = (valueToCopy: string) => {
		if ('clipboard' in navigator) {
			navigator.clipboard
				.writeText(valueToCopy)
				.then(() => handleCopyResult(true))
				.catch((err) => setError(err))
		} else {
			setError(new Error('useCopyToClipboard: navigator.clipboard is not supported'))
		}
	}

	const reset = () => {
		setCopied(false)
		setError(null)
		if (copyTimeout) window.clearTimeout(copyTimeout)
	}

	return { copy, reset, error, copied }
}
