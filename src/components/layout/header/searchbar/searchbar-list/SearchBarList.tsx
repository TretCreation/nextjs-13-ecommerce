import useOnClickOutside from '@/src/components/hooks/useOnClickOutside'
import { createRef, FC, useEffect } from 'react'
import SearchBarItem from '../searchbar-item/SearchBarItem'
import styles from './SearchBarList.module.scss'

interface ISearchBarListProps {
	isOpen: boolean
	handleClose: () => void
}

const SearchBarList: FC<ISearchBarListProps> = ({ isOpen, handleClose }) => {
	if (!isOpen) return null

	const ref = createRef<HTMLDivElement>()

	//* Close modal on click outside
	useOnClickOutside(ref, () => handleClose())

	//* Close modal on escape
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) =>
			e.key === 'Escape' ? handleClose() : null
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [handleClose])

	return (
		<div className={styles.list} ref={ref}>
			<SearchBarItem />
			<SearchBarItem />
			<SearchBarItem />
			<SearchBarItem />
			<SearchBarItem />
		</div>
	)
}

export default SearchBarList
