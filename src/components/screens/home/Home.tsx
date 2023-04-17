import { Pagination, ProductList } from '@/src/components'
import { IProduct, IProductHomeProps } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import { FC, useEffect, useState } from 'react'
import styles from './Home.module.scss'

const Home: FC<IProductHomeProps> = ({
	products,
	paginatedProducts,
	countedProducts
}) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [paginatedProductss, setPaginatedProductss] = useState<IProduct[]>([])
	console.log(currentPage)

	useEffect(() => {
		const fetchPaginatedProducts = async () => {
			const res = await ProductService.getPaginatedProducts(currentPage)
			console.log('res: ', res)
			setPaginatedProductss(res)
		}
		fetchPaginatedProducts()
	}, [currentPage])

	// const pProducts: IProduct[] = paginate(products, currentPage, 10)

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.header}>BEST SELLERS</h1>
			<ProductList products={paginatedProducts} />
			<Pagination
				items={countedProducts}
				pageSize={10}
				onChange={page => setCurrentPage(page)}
			/>
		</div>
	)
}

export default Home
