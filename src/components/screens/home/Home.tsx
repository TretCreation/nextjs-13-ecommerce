import { Pagination, ProductList } from '@/src/components'
import { IProduct, IProductProps } from '@/src/interfaces/product.interface'
import { FC, useState } from 'react'
import { paginate } from '../pagination/paginate'
import styles from './Home.module.scss'

const Home: FC<IProductProps> = ({ products }) => {
	const [currentPage, setCurrentPage] = useState(1)

	const onChange = (page: number) => {
		setCurrentPage(page)
	}

	const paginatedProducts: IProduct[] = paginate(products, currentPage, 10)

	return (
		<>
			<div className={styles.wrapper}>
				<h1 className={styles.header}>BEST SELLERS</h1>
				<ProductList products={paginatedProducts} />
				<Pagination
					items={products.length}
					pageSize={10}
					onChange={onChange}
				/>
			</div>
		</>
	)
}

export default Home
