import { RefObject, useCallback, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	callback: () => void
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
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('touchstart', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [ref, handleClickOutside])
}

export default useOnClickOutside
