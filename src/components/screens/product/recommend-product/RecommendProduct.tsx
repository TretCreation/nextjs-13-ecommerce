import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { getProductUrl } from '@/src/configs/url.config'
import { IProductPage } from '@/src/interfaces/product.interface'
import { addCartProducts, addProduct } from '@/src/store/cart/cart.slice'

import styles from './RecommendProduct.module.scss'

const RecommendProduct: FC<{ recommendProducts: IProductPage[] }> = ({ recommendProducts }) => {
  const [isModalCart, setIsModalCart] = useState(false)
  const dispatch = useAppDispatch()

  const { cartProducts } = useAppSelector(state => state.cart)

  const { data: session, status } = useSession()

  if (!Array.isArray(recommendProducts)) {
    return null
  }

  return (
    <>
      <p className={styles.title}>What buys with:</p>
      {recommendProducts.map(product => {
        const isExistCart = cartProducts.some(c => c.id === product.id)

        return (
          <div className={styles.product} key={product.id}>
            <Link href={getProductUrl(`/${product.id}`)} className={styles.link}>
              <Image
                src={product.img}
                alt={product.name}
                width={60}
                height={0}
                priority
                className={styles.img}
              />
              <div className={styles.text}>{product.name}</div>
            </Link>
            <div className={styles.price}>${product.price}</div>
            <Button
              appearance='primary'
              className={styles.svg}
              onClick={
                isExistCart
                  ? () => setIsModalCart(!isModalCart)
                  : status === 'authenticated'
                  ? () =>
                      dispatch(
                        addCartProducts({
                          product: product,
                          productId: product.id,
                          userId: session.user.id
                        })
                      )
                  : () => dispatch(addProduct(product))
              }
            >
              {isExistCart ? 'Move to Cart' : 'Add to cart'}
            </Button>
          </div>
        )
      })}
      <ModalCart handleClose={() => setIsModalCart(!isModalCart)} isOpen={isModalCart} />
    </>
  )
}

export default RecommendProduct
