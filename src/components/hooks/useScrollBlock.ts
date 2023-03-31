import { useCallback, useEffect, useState } from 'react'

const useScrollBlock = () => {
	const [isLocked, setIsLocked] = useState<boolean>(false)

	useEffect(() => {
		isLocked
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto')
	}, [isLocked])

	const toggle = useCallback(
		(): void => setIsLocked(isLocked => !isLocked),
		[]
	)
	return [toggle]
}

export default useScrollBlock
