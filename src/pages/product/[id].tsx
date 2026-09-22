import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import prisma from '@/prisma/client'
import { ProductPage } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'

interface Params extends ParsedUrlQuery {
  id: string
}

const Product: NextPage<{ product: IProduct }> = ({ product }) => <ProductPage product={product} />

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const products = await prisma.product.findMany()

  return {
    paths: products.map(product => ({
      params: { id: String(product.id) }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<{ product: IProduct }> = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params?.id)
    },
    include: {
      brand: true,
      type: true,
      product_info: true
    }
  })

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      product
    },
    revalidate: 10
  }
}

export default Product
