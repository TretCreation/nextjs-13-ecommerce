import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

import { GarbageIcon } from '@/src/assets'
import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { getProductUrl } from '@/src/configs/url.config'
import { IProduct } from '@/src/interfaces/product.interface'
import { addCartProducts } from '@/src/store/cart/cart.api'
import { actions } from '@/src/store/rootActions'
import { removeWishlistProducts } from '@/src/store/wishlist/wishlist.api'

import styles from './WishlistItem.module.scss'

interface IWishlistItemProps {
  wishProduct: IProduct
}

const WishlistItem: FC<IWishlistItemProps> = ({ wishProduct }) => {
  const dispatch = useAppDispatch()
  const { cartProducts } = useAppSelector(state => state.cart)

  const isExistCart = cartProducts.some(w => w.id === wishProduct.id)

  const { data: session, status } = useSession()

  const [isModalCart, setIsModalCart] = useState(false)

  return (
    <div className={styles.product}>
      <Link href={getProductUrl(`${wishProduct.id}`)} className={styles.link}>
        <Image
          src={wishProduct.img}
          alt={wishProduct.name}
          width={60}
          height={0}
          priority
          className={styles.img}
        />
        <div className={styles.text}>{wishProduct.name}</div>
      </Link>
      <div className={styles.price}>${wishProduct.price}</div>
      <Button
        appearance='primary'
        className={isExistCart ? styles['btn-disabled'] : styles.btn}
        onClick={
          isExistCart
            ? () => setIsModalCart(!isModalCart)
            : status === 'authenticated'
            ? () =>
                dispatch(
                  addCartProducts({
                    //?
                    product: wishProduct,
                    productId: wishProduct.id,
                    userId: session.user.id
                  })
                )
            : () => dispatch(actions.cart.addProduct(wishProduct))
        }
      >
        {isExistCart ? 'Move to Cart' : 'Add to cart'}
      </Button>
      <Button
        appearance='svg'
        className={styles.svg}
        onClick={
          status === 'authenticated'
            ? () =>
                dispatch(
                  removeWishlistProducts({
                    product: wishProduct,
                    productId: wishProduct.id,
                    userId: session.user.id
                  })
                )
            : () => dispatch(actions.wishlist.removeProduct(wishProduct))
        }
      >
        <GarbageIcon className='h-6 w-6' />
      </Button>
      <ModalCart handleClose={() => setIsModalCart(!isModalCart)} isOpen={isModalCart} />
    </div>
  )
}

export default WishlistItem
