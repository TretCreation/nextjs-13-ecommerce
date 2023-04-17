import { Home } from '@/src/components'
import { GetStaticProps, NextPage } from 'next'
import { IProductHomeProps } from '../interfaces/product.interface'
import { ProductService } from '../services/ProductService'

const HomePage: NextPage<IProductHomeProps> = ({
	products,
	paginatedProducts,
	countedProducts
}) => {
	return (
		<Home
			products={products}
			paginatedProducts={paginatedProducts}
			countedProducts={countedProducts}
		/>
	)
}

export const getStaticProps: GetStaticProps<IProductHomeProps> = async () => {
	const allProducts = await ProductService.getAll()
	const paginatedProducts = await ProductService.getPaginatedProducts(1)
	const countedProducts = await ProductService.getCountedProducts()

	return {
		props: {
			products: allProducts,
			countedProducts: countedProducts,
			paginatedProducts: paginatedProducts
		},
		revalidate: 10
	}
}

export default HomePage
