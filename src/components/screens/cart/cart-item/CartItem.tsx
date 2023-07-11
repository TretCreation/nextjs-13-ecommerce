import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FC } from 'react'

import { GarbageIcon } from '@/public'
import { Button, useAppDispatch } from '@/src/components'
import { getProductUrl } from '@/src/configs/url.config'
import { ICartItemProps } from '@/src/interfaces/cart.interface'
import {
  decrementCount,
  decrementCountProducts,
  incrementCount,
  incrementCountProducts,
  removeCartProducts,
  removeProduct
} from '@/src/store/cart/cart.slice'

import styles from './CartItem.module.scss'

interface ICart extends ICartItemProps {
  handleClose: () => void
}

const CartItem: FC<ICart> = ({ cartProduct, handleClose }) => {
  const dispatch = useAppDispatch()

  const { data: session, status } = useSession()

  return (
    <div className={styles.product}>
      <Link
        href={getProductUrl(`/${cartProduct.id}`)}
        className={styles.link}
        onClick={handleClose}
      >
        <Image
          src={cartProduct.img}
          alt={cartProduct.name}
          width={60}
          height={0}
          priority
          className={styles.img}
        />
        <div className={styles.text}>{cartProduct.name}</div>
      </Link>
      <div className='change:count'>
        <Button
          appearance='solid'
          onClick={
            status === 'authenticated'
              ? () =>
                  dispatch(
                    decrementCountProducts({
                      productId: cartProduct.id,
                      userId: session.user.id
                    })
                  )
              : () => dispatch(decrementCount(cartProduct.id))
          }
        >
          <p>-</p>
        </Button>
        {cartProduct.count}
        <Button
          appearance='solid'
          onClick={
            status === 'authenticated'
              ? () =>
                  dispatch(
                    incrementCountProducts({
                      productId: cartProduct.id,
                      userId: session.user.id
                    })
                  )
              : () => dispatch(incrementCount(cartProduct.id))
          }
        >
          <p>+</p>
        </Button>
      </div>
      <div className={styles.price}>${cartProduct.price}</div>
      <Button
        appearance='svg'
        className={styles.svg}
        onClick={
          status === 'authenticated'
            ? () =>
                dispatch(
                  removeCartProducts({
                    product: cartProduct,
                    productId: cartProduct.id,
                    userId: session.user.id
                  })
                )
            : () => dispatch(removeProduct(cartProduct))
        }
      >
        <GarbageIcon className='h-6 w-6' />
      </Button>
    </div>
  )
}

export default CartItem
