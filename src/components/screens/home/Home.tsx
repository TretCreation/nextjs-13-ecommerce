import { Pagination, ProductList } from '@/src/components'
import { IProduct, IProductHomeProps } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import { FC, useEffect, useState } from 'react'
import styles from './Home.module.scss'

const Home: FC<IProductHomeProps> = ({
	paginatedProducts,
	countedProducts
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [clientPaginatedProducts, setPaginatedProducts] = useState<
		IProduct[]
	>([])

	useEffect(() => {
		setPaginatedProducts(paginatedProducts)
	}, [])

	useEffect(() => {
		const fetchPaginatedProducts = async () => {
			const res = await ProductService.getPaginatedProducts(currentPage)
			console.log('res: ', res)
			console.log(currentPage)
			setPaginatedProducts(res)
		}
		fetchPaginatedProducts()
	}, [currentPage])

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.header}>BEST SELLERS</h1>
			<ProductList products={clientPaginatedProducts} />
			<Pagination
				items={countedProducts}
				pageSize={10}
				onChange={page => setCurrentPage(page)}
			/>
		</div>
	)
}

export default Home
