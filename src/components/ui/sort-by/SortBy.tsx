import { ChangeEvent, FC, useEffect, useState } from 'react'

import { sortKey, sortValue, typeId } from '@/src/interfaces/api.type'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'

import styles from './SortBy.module.scss'

interface ISortBy {
	limit: number
	q: typeId | any
	currentPage: number
	brandId: number | number[] | undefined
	getProducts: (products: IProduct[]) => void
	setCurrentPage: (currentPage: number) => void
}

const SortBy: FC<ISortBy> = ({ limit, q, getProducts, setCurrentPage, currentPage, brandId }) => {
	const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])
	const [getKey, setGetKey] = useState<sortKey>('r')
	const [getValue, setGetValue] = useState<sortValue>('desc')
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = async (selectEvent: ChangeEvent<HTMLSelectElement>) => {
		const options: { [key: string]: [sortKey, sortValue] } = {
			low: ['p', 'asc'],
			high: ['p', 'desc'],
			rating: ['r', 'desc']
		}
		const [k, v] = options[selectEvent.target.value]
		filterProducts(k, v)
	}

	const filterProducts = async (key: sortKey, value: sortValue) => {
		setSortedProducts([])
		setGetKey(key)
		setGetValue(value)
		setCurrentPage(1)
	}

	useEffect(() => {
		setIsLoading(true)

		console.log('SortBy useEffect brandId: ', brandId)
		// console.log('handleInput sortedProducts before', sortedProducts)
		// console.log('handleInput currentPage', currentPage)

		SortByService.getSortedProducts(getKey, getValue, q, limit, currentPage, brandId).then(
			res => {
				// console.log('res', res)

				setSortedProducts(currentPage === 1 ? res : [...sortedProducts, ...res])
				getProducts(currentPage === 1 ? res : [...sortedProducts, ...res])

				setIsLoading(false)
			}
		)
	}, [getKey, getValue, q, brandId, limit, currentPage])

	return (
		<div className={styles.wrapper}>
			<label htmlFor='sortBy'>Sort By:</label>
			<select className={styles.select} onChange={handleChange} defaultValue='rating'>
				<option value='low'>Price: Low to High</option>
				<option value='high'>Price: High to Low</option>
				<option value='rating'>Rating</option>
			</select>
			{isLoading && sortedProducts.length === 0 && <p>Loading...</p>}
		</div>
	)
}

export default SortBy
