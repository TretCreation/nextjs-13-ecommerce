import styles from './SortBy.module.scss'

const SortBy = () => {
	type SortOrder = 'asc' | 'desc'

	return (
		<div className={styles.wrapper}>
			<label htmlFor='sortBy'>Sort By:</label>
			<select className={styles.select}>
				<option value='priceLowToHight'>Price: Low to High</option>
				<option value='priceHightToLow'>Price: High to Low</option>
				<option value='rating' selected>
					Rating
				</option>
			</select>
		</div>
	)
}

export default SortBy
