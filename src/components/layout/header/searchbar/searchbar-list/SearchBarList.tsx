import useEscape from '@/src/components/hooks/useEscape'
import useOutside from '@/src/components/hooks/useOutside'
import { IProduct } from '@/src/interfaces/product.interface'
import { FC, useEffect, useRef, useState } from 'react'
import SearchBarItem from '../searchbar-item/SearchBarItem'
import styles from './SearchBarList.module.scss'

interface ISearchBarListProps {
	searchedProducts: IProduct[]
}

const SearchBarList: FC<ISearchBarListProps> = ({ searchedProducts }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const ref = useRef<HTMLDivElement>(null)

	//TODO Fix isOpen
	// useEffect(() => {
	// 	if (searchedProducts.length != 0) {
	// 		setIsOpen(isOpen => !isOpen)
	// 	}
	// }, [searchedProducts])
	useEffect(() => {
		if (searchedProducts.length > 0) {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}, [searchedProducts])

	const handleClose = () => {
		setIsOpen(!isOpen)
	}

	//* Close modal on click outside
	useOutside(
		ref,
		() => {
			setIsOpen(false)
		},
		isOpen
	)

	//* Close modal on escape
	useEscape(handleClose, isOpen)

	if (!isOpen) return null
	// console.log
	console.log('searchedProducts', searchedProducts)
	console.log('isOpen: ', isOpen)

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
