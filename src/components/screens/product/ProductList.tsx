import { ProductItem } from '@/src/components'
import React, { FC } from 'react'
import { IProduct, IProductProps } from '../../../interfaces/product.interface'

const ProductList: FC<IProductProps> = ({ products }) => {
	return (
		<div className='flex flex-row flex-wrap justify-between'>
			{products.length ? (
				products.map((product: IProduct) => (
					<ProductItem key={product.id} product={product} />
				))
			) : (
				<p>There are no products :(</p>
			)}
		</div>
	)
}

export default ProductList
