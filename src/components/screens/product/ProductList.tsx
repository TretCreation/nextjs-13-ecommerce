import { ProductItem } from '@/src/components'
import { NextPage } from 'next'
import React from 'react'
import { IProduct, IProductProps } from '../../../interfaces/product.interface'

const ProductList: NextPage<IProductProps> = ({ products }) => {
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
