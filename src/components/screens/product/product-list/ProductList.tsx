import { NoProducts, ProductItem } from '@/src/components'
import { FC } from 'react'
import {
	IProduct,
	IProductProps
} from '../../../../interfaces/product.interface'
import styles from './ProductList.module.scss'

const ProductList: FC<IProductProps> = ({ products }) => {
	return (
		<div className={styles.wrapper}>
			{products.length ? (
				products.map((product: IProduct) => (
					<ProductItem key={product.id} product={product} />
				))
			) : (
				<NoProducts />
			)}
		</div>
	)
}

export default ProductList
