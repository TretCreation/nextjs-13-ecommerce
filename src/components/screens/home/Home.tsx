import { Pagination, ProductList } from '@/src/components'
import { IProductProps } from '@/src/interfaces/product.interface'
import { FC, useState } from 'react'
import styles from './Home.module.scss'

const Home: FC<IProductProps> = ({ products }) => {
	const [page, setPage] = useState(1)
	const handlePageChange = (count: number) => setPage(count)

	return (
		<>
			<div className={styles.wrapper}>
				<h1 className={styles.header}>BEST SELLERS</h1>
				<ProductList products={products} />
				<Pagination
					current={page}
					onChange={handlePageChange}
					limit={products.length === 8}
				/>
			</div>
		</>
	)
}

export default Home
