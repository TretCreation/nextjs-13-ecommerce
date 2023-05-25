import { Pagination, ProductList } from '@/src/components'
import { IProduct, IProductHomeProps } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import { FC, useEffect, useState } from 'react'
import styles from './Home.module.scss'

const Home: FC<IProductHomeProps> = ({ paginatedProducts, countedProducts }) => {
	const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [clientPaginatedProducts, setPaginatedProducts] = useState<IProduct[]>([])

	useEffect(() => {
		const fetchPaginatedProducts = async () => {
			const res = await ProductService.getPaginatedProducts(10, currentPage)
			console.log('fetchPaginatedProducts: ', res)
			setPaginatedProducts(res)
			setIsFirstRendering(false)
		}
		//?
		if (!isFirstRendering || currentPage !== 1) {
			fetchPaginatedProducts()
		}
		// if (!isFirstRendering && (currentPage !== 1 || isFirstRendering)) {
		// 	fetchPaginatedProducts()
		// }
	}, [currentPage, isFirstRendering])

	console.log('##########################')
	console.log('currentPage', currentPage)
	console.log('isFirstRendering', isFirstRendering)
	console.log('paginatedProducts', paginatedProducts)
	console.log('clientPaginatedProducts', clientPaginatedProducts)
	console.log('##########################')

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.header}>BEST SELLERS</h1>
			<ProductList
				products={isFirstRendering ? paginatedProducts : clientPaginatedProducts}
			/>
			<Pagination
				items={countedProducts}
				pageSize={10}
				onChange={page => setCurrentPage(page)}
			/>
		</div>
	)
}

export default Home
