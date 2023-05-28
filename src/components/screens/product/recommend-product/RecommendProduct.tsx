import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

import { addCartProducts, addProduct } from '@/src/store/cart/cart.slice'
import Image from 'next/image'
import Link from 'next/link'
import styles from './RecommendProduct.module.scss'

const RecommendProduct: FC<{ recommendProducts: IProduct[] }> = ({ recommendProducts }) => {
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
						<Link href={`/product/${product.id}`} className={styles.link}>
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
													//?
													// eslint-disable-next-line @typescript-eslint/ban-ts-comment
													// @ts-ignore
													product: product,
													productId: product.id,
													userId: session.user.id
												})
											)
									: //?
									  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
									  // @ts-ignore
									  () => dispatch(addProduct(product))
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
