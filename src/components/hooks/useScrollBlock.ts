// import { useEffect, useState } from 'react'

// const useScrollBlock = () => {
// 	const [isLocked, setIsLocked] = useState<boolean>(true)

// 	useEffect(() => {
// 		isLocked
// 			? (document.body.style.overflow = 'hidden')
// 			: (document.body.style.overflow = 'auto')
// 		console.log(isLocked)
// 		// return () => (document.body.style.overflow = 'auto')
// 		return () => setIsLocked(!isLocked)
// 	}, [isLocked])
// }

// export default useScrollBlock

import { useEffect } from 'react'

const useBodyScrollLock = () => {
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow
		document.body.style.paddingRight = '17px'
		document.body.style.overflow = 'hidden'
		return () => (document.body.style.overflow = originalStyle)
	}, [])
}

export default useBodyScrollLock
