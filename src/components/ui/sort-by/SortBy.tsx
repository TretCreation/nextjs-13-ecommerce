//?
/* eslint-disable no-inner-declarations */

import { sortKey, sortValue, typeId } from '@/src/interfaces/api.type'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import styles from './SortBy.module.scss'

interface ISortBy {
	limit: number
	q: typeId
	products: IProduct[]
	currentPage: number
	getProducts: (products: IProduct[]) => void
	setCurrentPage: (currentPage: number) => void
}

const SortBy: FC<ISortBy> = ({
	limit,
	q,
	getProducts,
	setCurrentPage,
	products,
	currentPage
}) => {
	const notInitialRender = useRef(false)

	const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products)
	// const [currentPage, setCurrentPage] = useState<number>(1)
	const [getKey, setGetKey] = useState<sortKey>('r')
	const [getValue, setGetValue] = useState<sortValue>('desc')

	// const handleButton = () => {
	// 	setCurrentPage(currentPage + 1)
	// }

	const handleChange = async (
		selectEvent: ChangeEvent<HTMLSelectElement>
	) => {
		//?
		const options: any = {
			low: ['p', 'asc'],
			high: ['p', 'desc'],
			rating: ['r', 'desc']
		}
		const [k, v] = options[selectEvent.target.value]
		filterProducts(k, v)
	}

	const filterProducts = async (key: sortKey, value: sortValue) => {
		const res = await SortByService.getSortedProducts(
			key,
			value,
			q,
			limit,
			1
		)

		setGetKey(key)
		setGetValue(value)

		setSortedProducts(res)
		getProducts(res)
		// TODO: Re-render when setCurrentPage((currentPage = 1))

		setCurrentPage((currentPage = 1))
	}

	useEffect(() => {
		if (notInitialRender.current) {
			async function handleInput() {
				const res = await SortByService.getSortedProducts(
					getKey,
					getValue,
					q,
					limit,
					currentPage
				)
				const concatenatedProducts = sortedProducts.concat(res)

				setSortedProducts(concatenatedProducts)
				getProducts(concatenatedProducts)
			}

			handleInput()
		} else {
			notInitialRender.current = true
		}
	}, [currentPage])

	useEffect(() => {
		console.log('Child: CurrentPage: ', currentPage)
	}, [currentPage])

	return (
		<div className={styles.wrapper}>
			<label htmlFor='sortBy'>Sort By:</label>
			<select
				className={styles.select}
				onChange={handleChange}
				defaultValue='rating'
			>
				<option value='low'>Price: Low to High</option>
				<option value='high'>Price: High to Low</option>
				<option value='rating'>Rating</option>
			</select>
			{/* <Button appearance='primary' onClick={handleButton}>
				<p>Load more </p>
			</Button> */}
		</div>
	)
}

export default SortBy
