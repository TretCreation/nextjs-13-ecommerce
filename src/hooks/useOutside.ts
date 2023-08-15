import { RefObject, useCallback, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

function useOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	callback: () => void,
	isOpen: boolean
) {
	const handleClickOutside = useCallback(
		(event: Event) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		},
		[ref, callback]
	)

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('touchstart', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [isOpen, handleClickOutside])
}

export default useOutside
