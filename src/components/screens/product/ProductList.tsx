import { ProductItem } from '@/src/components'
import { ProductService } from '@/src/services/ProductService'
import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../interfaces/product.interface'

export default function ProductList() {
	const [products, setProducts] = useState<IProduct[]>([])

	useEffect(() => {
		const fetchProducts = async () => {
			const data = await ProductService.getAll()
			setProducts(data)
		}
		fetchProducts()
	}, [])

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
