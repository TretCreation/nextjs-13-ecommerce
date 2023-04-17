import { ProductService } from '@/src/services/ProductService'
import { FC, useEffect, useState } from 'react'
import Button from '../../ui/button/Button'
import styles from './Pagination.module.scss'
interface IPaginationProps {
	items: number
	pageSize: number
	onChange(page: number): void
}

const Pagination: FC<IPaginationProps> = ({ items, pageSize, onChange }) => {
	const pagesCount: number = Math.ceil(items / pageSize)
	const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1)

	const [paginatedProduct, setPaginatedProduct] = useState<number>()
	// const [paginatedProducts, setPaginatedProducts] = useState([])

	useEffect(() => {
		const fetchPaginatedProducts = async () => {
			const res = await ProductService.getPaginatedProducts(2)
			console.log('res: ', res)
			// setPaginatedProducts(res)
		}
		fetchPaginatedProducts()
	}, [])

	return (
		<div className={styles.pagination}>
			{pages.map((page: number) => (
				<Button
					key={page}
					appearance='solid'
					className={styles.btn}
					onClick={() => onChange(page)}
				>
					{page}
				</Button>
			))}
		</div>
	)
}

export default Pagination
