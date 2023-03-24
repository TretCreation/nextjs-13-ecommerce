import { Home } from '@/src/components'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { IProductProps } from '../interfaces/product.interface'
import { ProductService } from '../services/ProductService'

const HomePage: NextPage<IProductProps> = ({ products }) => {
	return <Home products={products} />
}

export const getStaticProps: GetStaticProps<IProductProps> = async () => {
	const res = await ProductService.getAll()

	return {
		props: {
			products: res
		},
		revalidate: 10
	}
}

export default HomePage
