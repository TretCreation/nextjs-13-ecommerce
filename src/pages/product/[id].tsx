import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { ProductPage } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/product.service'

interface Params extends ParsedUrlQuery {
  id: string
}

const Product: NextPage<{ product: IProduct }> = ({ product }) => <ProductPage product={product} />

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

export const getStaticProps: GetStaticProps<{ product: IProduct }> = async ({ params }) => {
  const product = await ProductService.getById(String(params?.id))

  return {
    props: {
      product
    },
    revalidate: 10
  }
}

export default Product
