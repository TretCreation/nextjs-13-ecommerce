import { GetStaticProps, NextPage } from 'next'

import prisma from '@/prisma/client'
import { Home } from '@/src/components'

import { IProductHomeProps } from '../interfaces/product.interface'

const HomePage: NextPage<IProductHomeProps> = ({ paginatedProducts, countedProducts }) => (
  <Home paginatedProducts={paginatedProducts} countedProducts={countedProducts} />
)

export const getStaticProps: GetStaticProps<IProductHomeProps> = async () => {
  const paginatedProducts = await prisma.product.findMany({
    take: 10,
    skip: 0
  })

  const countedProducts = await prisma.product.count()

  return {
    props: {
      countedProducts,
      paginatedProducts
    },
    revalidate: 10
  }
}

export default HomePage
