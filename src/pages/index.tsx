import { GetStaticProps, NextPage } from 'next'

import { Home } from '@/src/components'

import { IProductHomeProps } from '../interfaces/product.interface'
import { ProductService } from '../services/product.service'

const HomePage: NextPage<IProductHomeProps> = ({ paginatedProducts, countedProducts }) => (
  <Home paginatedProducts={paginatedProducts} countedProducts={countedProducts} />
)

export const getStaticProps: GetStaticProps<IProductHomeProps> = async () => {
  const paginatedProducts = await ProductService.getPaginatedProducts(10, 1)
  const countedProducts = await ProductService.getCountedProducts()
  return {
    props: {
      countedProducts,
      paginatedProducts
    },
    revalidate: 10
  }
}

export default HomePage
