import { Button, ProductItem, SortBy } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { FC, useState } from 'react'
import NoProducts from '../../product/product-empty/NoProducts'
import styles from './CategoryWatches.module.scss'

interface ICategoryWatchesProps {
	watches: IProduct[]
}

const CategoryWatches: FC<ICategoryWatchesProps> = ({ watches }) => {
	const [products, setProducts] = useState<IProduct[]>(watches)
	const [currentPage, setCurrentPage] = useState<number>(1)

	return (
		<div className={styles.category}>
			<div className={styles.filter}>filter</div>
			<div>
				<SortBy
					limit={16}
					q={3}
					currentPage={currentPage}
					setCurrentPage={currentPage => setCurrentPage(currentPage)}
					getProducts={products => setProducts(products)}
				/>
				<div className={styles.products}>
					{products.length ? (
						products.map((product: IProduct) => (
							<ProductItem key={product.id} product={product} />
						))
					) : (
						<NoProducts />
					)}
				</div>
				<Button appearance='primary' onClick={() => setCurrentPage(currentPage + 1)}>
					<p>Load more </p>
				</Button>
			</div>
		</div>
	)
}

export default CategoryWatches
