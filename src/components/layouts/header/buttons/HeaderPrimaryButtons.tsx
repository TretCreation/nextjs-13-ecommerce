import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'

import { AccountIcon, CartIcon, SignInIcon, WishlistIcon } from '@/src/assets'
import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { getAccountUrl, getWishlistUrl } from '@/src/configs/url.config'
import { fetchProducts as fetchCartProducts } from '@/src/store/cart/cart.api'
import { fetchProducts as fetchWishlistProducts } from '@/src/store/wishlist/wishlist.api'
import { toastError } from '@/src/utils/api/handleToastError'

import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
  const dispatch = useAppDispatch()

  const [isModalCartOpen, setIsModalCartOpen] = useState<boolean>(false)

  const { wishProducts } = useAppSelector(state => state.wishlist)
  const { cartProducts } = useAppSelector(state => state.cart)

  const { data: session } = useSession()

  // ? Where to dispatch wishlist and card products?
  useEffect(() => {
    if (session) {
      dispatch(fetchWishlistProducts(session.user.id)).catch(error => {
        toastError(error)
      })
    }
  }, [dispatch, session])

  useEffect(() => {
    if (session) {
      dispatch(fetchCartProducts(session.user.id)).catch(error => {
        toastError(error)
      })
    }
  }, [dispatch, session])

  return (
    <>
      <div className={styles.buttons}>
        <Button appearance='svg' className={styles.btn}>
          <Link href={getWishlistUrl}>
            <WishlistIcon className={styles.icon} />
            <span className={styles.span}>{wishProducts.length}</span>
            <p className={styles.text}>Wishlist</p>
          </Link>
        </Button>
        <Button
          appearance='svg'
          onClick={() => setIsModalCartOpen(!isModalCartOpen)}
          className={styles.btn}
        >
          <CartIcon className={styles.icon} />
          <span className={styles.span}>{cartProducts.length}</span>
          <p className='text-l'>Cart</p>
        </Button>
        <Button appearance='svg' className={styles.btn}>
          <Link href={getAccountUrl}>
            {session ? (
              <>
                <AccountIcon className={styles.icon} />
                <p className='text-l'>Account</p>
              </>
            ) : (
              <>
                <SignInIcon className={styles.icon} />
                <p className='text-l'>Sign In</p>
              </>
            )}
          </Link>
        </Button>
      </div>
      <ModalCart
        handleClose={() => setIsModalCartOpen(!isModalCartOpen)}
        isOpen={isModalCartOpen}
      />
    </>
  )
}

export default HeaderPrimaryButtons
