import { WishlistIcon } from '@/public'
import { Button, Rating, useAppDispatch, useAppSelector } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { cartActions, wishlistActions } from '@/src/store'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './ProductItem.module.scss'

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	const dispatch = useAppDispatch()

	const { wishProducts } = useAppSelector(state => state.wishlist)
	const { cartProducts } = useAppSelector(state => state.cart)

	const isExistWishlist = wishProducts.some(p => p.id === product.id)
	const isExistCart = cartProducts.some(p => p.id === product.id)
	console.log('wishProducts', wishProducts)

	return (
		<div className={styles.card}>
			<Link href={`product/${product.id}`} className={styles.img}>
				<Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<Link href={`product/${product.id}`}>
					<h2 className={styles.title}>{product.name}</h2>
				</Link>
				<Button appearance='svg' className={styles.wishlist}>
					<WishlistIcon
						className={isExistWishlist ? styles.exist : styles['not-exist']}
						onClick={() => dispatch(wishlistActions.toggleWishlist(product))}
					/>
				</Button>
				<p>${product.price}</p>
				<Rating rating={product.rating} />
				<Button
					appearance='primary'
					className={
						isExistCart ? styles['cart-exist'] : styles['cart-not-exist']
					}
					onClick={() => dispatch(cartActions.toggleCart(product))}
				>
					<p>{isExistCart ? 'Remove from cart' : 'Add to cart'}</p>
				</Button>
			</div>
		</div>
	)
}

export default ProductItem
