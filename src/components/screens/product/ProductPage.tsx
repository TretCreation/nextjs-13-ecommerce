import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'

import { WishlistIcon } from '@/public'
import { IProductPage } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import { addCartProducts, addProduct } from '@/src/store/cart/cart.slice'
import { toggleWishlist, toggleWishlistProducts } from '@/src/store/wishlist/wishlist.slice'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import Button from '../../ui/button/Button'
import Rating from '../../ui/rating/Rating'
import ModalCart from '../cart/ModalCart'
import styles from './ProductPage.module.scss'
import RecommendProduct from './recommend-product/RecommendProduct'

export interface IProductPageProps {
  product: IProductPage
}

const ProductPage: FC<IProductPageProps> = ({ product }) => {
  const [recommendProducts, setRecommendsProducts] = useState<IProductPage[]>()
  const [isModalCart, setIsModalCart] = useState(false)

  const dispatch = useAppDispatch()

  const { data: session, status } = useSession()

  const { wishProducts } = useAppSelector(state => state.wishlist)
  const { cartProducts } = useAppSelector(state => state.cart)

  const isExistWishlist = wishProducts.some(p => p.id === product.id)
  const isExistCart = cartProducts.some(p => p.id === product.id)

  useEffect(() => {
    async function fetchData() {
      const res = await ProductService.getRecommendation(product.id)
      if (!res) return

      setRecommendsProducts(res)
    }
    fetchData()
  }, [product.id])

  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>{product.name}</title>
        </Head>
        <div className={styles['img-block']}>
          <Image
            src={product.img}
            alt={product.name}
            width={350}
            height={0}
            className={styles.img}
          />
        </div>
        <div className={styles.description}>
          <div>
            <h1 className={styles.product}>{product.name}</h1>
            <div className={styles.rating}>
              <Rating rating={product.rating} />
            </div>
            <p className='mb-1'>
              <a className={styles.text}>
                <b>Brand</b>:&nbsp;&nbsp;
              </a>
              {product.brand?.name}
            </p>
            <p className='mb-1'>
              <a className={styles.text}>
                <b>Category</b>:&nbsp;&nbsp;
              </a>
              {product.type?.name}
            </p>
            <p className='mb-3'>
              <a className={styles.text}>
                <b>Price</b>:&nbsp;&nbsp;
              </a>
              ${product.price}
            </p>
          </div>
          <div>
            <p>Descriptions: </p>
            {product.product_info &&
              product.product_info.map(info => (
                <div className='flex flex-row' key={info.id}>
                  <p>
                    <b>{info.description}</b>:&nbsp;&nbsp;
                  </p>
                  <p>{info.title}</p>
                </div>
              ))}
          </div>
          <Button
            appearance='primary'
            className={styles.cart}
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
          <Button appearance='svg' className={styles.wishlist}>
            <WishlistIcon
              className={isExistWishlist ? styles.exist : styles['not-exist']}
              onClick={
                status === 'authenticated'
                  ? () =>
                      dispatch(
                        toggleWishlistProducts({
                          product: product,
                          productId: product.id,
                          userId: session.user.id
                        })
                      )
                  : () => dispatch(toggleWishlist(product))
              }
            />
          </Button>
          {recommendProducts ? (
            <div className={styles.recommendations}>
              <RecommendProduct recommendProducts={recommendProducts} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ModalCart handleClose={() => setIsModalCart(!isModalCart)} isOpen={isModalCart} />
    </>
  )
}

export default ProductPage
