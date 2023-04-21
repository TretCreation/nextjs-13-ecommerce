import useOnClickOutside from '@/src/components/hooks/useOnClickOutside'
import { IProduct } from '@/src/interfaces/product.interface'
import { createRef, FC, useEffect } from 'react'
import SearchBarItem from '../searchbar-item/SearchBarItem'
import styles from './SearchBarList.module.scss'

interface ISearchBarListProps {
	isOpen: boolean
	handleClose: () => void
	searchedProducts: IProduct[]
}

const SearchBarList: FC<ISearchBarListProps> = ({
	isOpen,
	handleClose,
	searchedProducts
}) => {
	// const [isSuccess, setIsSuccess] = useState<boolean>(false)

	// if (searchedProducts.length != 0) {
	// 	setIsSuccess(!isSuccess)
	// }

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

	if (!isOpen) return null
	return (
		<div className={styles.list} ref={ref}>
			{searchedProducts.map(searchedProduct => (
				<SearchBarItem
					key={searchedProduct.id}
					searchedProduct={searchedProduct}
				/>
			))}
		</div>
	)
}

export default SearchBarList
