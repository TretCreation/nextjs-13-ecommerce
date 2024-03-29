import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FC } from 'react'

import { WishlistIcon } from '@/src/assets'
import { Button, Rating, useAppDispatch, useAppSelector } from '@/src/components'
import { getProductUrl } from '@/src/configs/url.config'
import { IProduct } from '@/src/interfaces/product.interface'
import { toggleCartProducts } from '@/src/store/cart/cart.api'
import { actions } from '@/src/store/rootActions'
import { toggleWishlistProducts } from '@/src/store/wishlist/wishlist.api'

import styles from './ProductItem.module.scss'

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useAppDispatch()

  const { data: session, status } = useSession()

  const { wishProducts } = useAppSelector(state => state.wishlist)
  const { cartProducts } = useAppSelector(state => state.cart)

  const isExistWishlist = wishProducts.some(p => p.id === product.id)
  const isExistCart = cartProducts.some(p => p.id === product.id)

  return (
    <div className={styles.card}>
      <Link href={getProductUrl(`${product.id}`)} className={styles.link}>
        <Image
          src={product.img}
          alt={product.name}
          width={160}
          height={0}
          priority
          className={styles.img}
        />
      </Link>
      <div className={styles.info}>
        <Link href={getProductUrl(`${product.id}`)}>
          <h2 className={styles.title}>{product.name}</h2>
        </Link>
        <Button appearance='svg' className={styles.wishlist}>
          <WishlistIcon
            className={isExistWishlist ? styles.exist : styles['not-exist']}
            onClick={
              status === 'authenticated'
                ? () =>
                    dispatch(
                      toggleWishlistProducts({
                        product,
                        productId: product.id,
                        userId: session.user.id
                      })
                    )
                : () => dispatch(actions.wishlist.toggleWishlist(product))
            }
          />
        </Button>
        <p className={styles.price}>${product.price}</p>
        <Rating rating={product.rating} className={styles.rating} />
        <Button
          appearance='primary'
          className={isExistCart ? styles['cart-exist'] : styles['cart-not-exist']}
          onClick={
            status === 'authenticated'
              ? () =>
                  dispatch(
                    toggleCartProducts({
                      //?
                      product: product,
                      productId: product.id,
                      userId: session.user.id
                    })
                  )
              : () => dispatch(actions.cart.toggleCart(product))
          }
        >
          <p>{isExistCart ? 'Remove from cart' : 'Add to cart'}</p>
        </Button>
      </div>
    </div>
  )
}

export default ProductItem
