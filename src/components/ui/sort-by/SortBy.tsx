import { sortKey, sortValue, typeId } from '@/src/interfaces/api.type'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './SortBy.module.scss'

interface ISortBy {
	limit: number
	q: typeId
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
		console.log('sortedProducts: sortedProducts', sortedProducts)
	}, [brandId, sortedProducts])

	useEffect(() => {
		console.log('sortedProducts: brandId', sortedProducts)
	}, [brandId])
	// }, [brandId, sortedProducts])

	useEffect(() => {
		const handleInput = async () => {
			setIsLoading(true)

			console.log('brandId: useEffect: ', brandId)
			console.log('sortedProducts:before', sortedProducts)
			//?
			setSortedProducts([])
			// SortBy.setState({ sortedProducts: [] }, async () => {

			// setState({ sortedProducts: [] }, async () => {

			console.log('sortedProducts:clear', sortedProducts)
			const res = await SortByService.getSortedProducts(
				getKey,
				getValue,
				q,
				limit,
				currentPage,
				brandId
			)
			const updatedProducts = [...sortedProducts, ...res]

			console.log('sortedProducts:after', sortedProducts)
			console.log('res', res)
			console.log('updatedProducts', updatedProducts)

			setSortedProducts(updatedProducts)
			getProducts(updatedProducts)

			setIsLoading(false)
		}
		// )}
		handleInput()
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
