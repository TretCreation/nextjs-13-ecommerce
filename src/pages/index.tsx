import { Home } from '@/src/components'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { IProduct, IProductProps } from '../interfaces/product.interface'
import { ProductService } from '../services/ProductService'

const HomePage: NextPage<IProductProps> = ({ products }) => {
	return <Home products={products} />
}

export const getStaticProps: GetStaticProps<IProductProps> = async () => {
	const res = await ProductService.getAll()

	console.log('Products page all:', res)
	console.log('Products page [0]:', res[0])

	return {
		props: {
			products: res
		}
		// revalidate: 10
	}
}
// getStaticProps()

export default HomePage
