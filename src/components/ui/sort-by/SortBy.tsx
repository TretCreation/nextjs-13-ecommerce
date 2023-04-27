import { sortKey, sortValue, typeId } from '@/src/interfaces/api.type'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { ChangeEvent, FC } from 'react'
import styles from './SortBy.module.scss'

interface ISortBy {
	typeId: typeId
	getProducts: (products: IProduct[]) => void
}

const SortBy: FC<ISortBy> = ({ typeId, getProducts }) => {
	const fetchData = async (k: sortKey, v: sortValue) => {
		const res = await SortByService.getSortedProducts(k, v, typeId)
		getProducts(res)
	}

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
		fetchData(k, v)
	}

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
		</div>
	)
}

export default SortBy
