import { useEffect } from 'react'

const useScrollLock = (): void => {
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow
		document.body.style.paddingRight = '17px'
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = originalStyle
		}
	}, [])
}

export default useScrollLock
