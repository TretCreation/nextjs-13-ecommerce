import { ProductItem, SortBy } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { FC } from 'react'
import NoProducts from '../../product/product-empty/NoProducts'
import styles from './CategorySmartphones.module.scss'

interface ICategorySmartphonesProps {
	smartphones: IProduct[]
}

const CategorySmartphones: FC<ICategorySmartphonesProps> = ({
	smartphones
}) => {
	return (
		<div className={styles.category}>
			<div className={styles.filter}>filter</div>
			<div>
				<SortBy />
				<div className={styles.products}>
					{smartphones.length ? (
						smartphones.map((product: IProduct) => (
							<ProductItem key={product.id} product={product} />
						))
					) : (
						<NoProducts />
					)}
				</div>
			</div>
		</div>
	)
}

export default CategorySmartphones
