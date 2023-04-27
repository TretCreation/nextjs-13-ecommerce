import { Home } from '@/src/components'
import { GetStaticProps, NextPage } from 'next'
import { IProductHomeProps } from '../interfaces/product.interface'
import { ProductService } from '../services/ProductService'

const HomePage: NextPage<IProductHomeProps> = ({
	paginatedProducts,
	countedProducts
}) => {
	return (
		<Home
			paginatedProducts={paginatedProducts}
			countedProducts={countedProducts}
		/>
	)
}

export const getStaticProps: GetStaticProps<IProductHomeProps> = async () => {
	const paginatedProducts = await ProductService.getPaginatedProducts(1)
	const countedProducts = await ProductService.getCountedProducts()
	return {
		props: {
			countedProducts: countedProducts,
			paginatedProducts: paginatedProducts
		},
		revalidate: 10
	}
}

export default HomePage
