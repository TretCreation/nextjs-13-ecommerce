import { FC } from 'react'

import { NoProducts, ProductItem } from '@/src/components'

import { IProduct } from '../../../../interfaces/product.interface'
import styles from './ProductList.module.scss'

const ProductList: FC<{ products: IProduct[] }> = ({ products }) => (
    <div className={styles.wrapper}>
      {products.length ? (
        products.map((product: IProduct) => <ProductItem key={product.id} product={product} />)
      ) : (
        <NoProducts />
      )}
    </div>
  )

export default ProductList
