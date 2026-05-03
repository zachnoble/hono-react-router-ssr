export const parseError = (error: unknown) => {
	const genericErrorMessage = 'An unexpected error occured'

	if (error === null || error === undefined) {
		return genericErrorMessage
	}

	if (error instanceof Error) {
		return error.message
	}

	// "An Error"
	if (typeof error === 'string') {
		return error
	}

	// { message: "An Error" }
	if (error instanceof Object && 'message' in error && typeof error.message === 'string') {
		return error.message
	}

	// { error: "An Error" }
	if (error instanceof Object && 'error' in error && typeof error.error === 'string') {
		return error.error
	}

	return genericErrorMessage
}
