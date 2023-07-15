import { NextPage } from 'next'
import Image from 'next/image'

import { NoWishlistProductsWebp } from '@/src/assets'

import styles from './NoProducts.module.scss'

const NoProducts: NextPage = () => (
  <div className={styles.wrapper}>
    <Image src={NoWishlistProductsWebp} alt='Cart is empty' />
    <p className={styles.text}>Wishlist is empty</p>
  </div>
)

export default NoProducts
