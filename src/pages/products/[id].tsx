import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ProductPage } from '@/src/components'
import { ProductService } from '@/src/services/ProductService'
import {
	IProductSingleProps
} from '@/src/interfaces/product.interface'
import { ParsedUrlQuery } from 'querystring'

interface Params extends ParsedUrlQuery {
	id: string
}

const Product: NextPage<IProductSingleProps> = ({ product }) => {

	return (
		<>
			<ProductPage product={product} />
		</>
	)
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const products = await ProductService.getAll()

	return {
		paths: products.map(product => ({
			params: {
				id: String(product.id)
			}
		})),
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps<IProductSingleProps> = async ({
	params
}) => {
	const product = await ProductService.getById(String(params?.id))
	console.log('Product: ', product)
	
	return {
		props: {
			product
		},
		revalidate: 10
	}
}

export default Product
