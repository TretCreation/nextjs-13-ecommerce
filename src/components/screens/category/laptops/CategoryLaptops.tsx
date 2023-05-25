import { Button, ProductItem, SortBy } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { FC, useEffect, useState } from 'react'
import NoProducts from '../../product/product-empty/NoProducts'
import styles from './CategoryLaptops.module.scss'

interface ICategoryLaptopsProps {
	laptops: IProduct[]
}

const CategoryLaptops: FC<ICategoryLaptopsProps> = ({ laptops }) => {
	const [products, setProducts] = useState<IProduct[]>(laptops)
	const [currentPage, setCurrentPage] = useState<number>(1)

	useEffect(() => {
		console.log('Parent: CurrentPage: ', currentPage)
	}, [currentPage])

	return (
		<div className={styles.category}>
			<div className={styles.filter}>filter</div>
			<div>
				<SortBy
					limit={16}
					q={2}
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

export default CategoryLaptops
