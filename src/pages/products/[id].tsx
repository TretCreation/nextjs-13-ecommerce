import React, { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ProductPage } from '@/src/components'
import { ProductService } from '@/src/services/ProductService'
import { IProduct, IProductProps } from '@/src/interfaces/product.interface'

const Product: FC<IProductProps> = ({ products }) => {
	console.log('Index Product: ', products)
	return (
		<>
			<ProductPage product={products} />
		</>
	)
}

// export const getStaticPath: GetStaticPaths = async () => {
// 	return {
// 		paths: [
// 			{
// 				params: { id: '1' }
// 			},
// 			{
// 				params: { id: '2' }
// 			}
// 		],
// 		fallback: false
// 	}
// }

// export const getStaticProps: GetStaticProps<{
// 	product: IProduct[]
// }> = async context => {
// 	const res = await ProductService.getAll()
// 	const product: IProduct[] = res

// 	console.log(`Product page: ${res}`)

// 	return {
// 		props: {
// 			product
// 		},
// 		revalidate: 10
// 	}
// }

export default Product
