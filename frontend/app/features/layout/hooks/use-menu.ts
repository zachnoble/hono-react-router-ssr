import { useEffect, useState } from 'react'

export const useMenu = () => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : ''

		const handleResize = () => {
			document.body.style.overflow = ''
		}

		window.addEventListener('resize', handleResize)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('resize', handleResize)
		}
	}, [open])

	return {
		open,
		setOpen,
	}
}
