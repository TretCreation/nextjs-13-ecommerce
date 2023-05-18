import { GarbageIcon } from '@/public'
import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { cartActions, wishlistActions } from '@/src/store'
import { removeWishlistProducts } from '@/src/store/wishlist/wishlist.slice'
import { useSession } from 'next-auth/react'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './WishlistItem.module.scss'

interface IWishlistItemProps {
	wishProduct: IProduct
}

const WishlistItem: FC<IWishlistItemProps> = ({ wishProduct }) => {
	const dispatch = useAppDispatch()
	const { cartProducts } = useAppSelector(state => state.cart)
	const isExistCart = cartProducts.some(w => w.id === wishProduct.id)

	const { data: session, status } = useSession()

	const [isModalAuthOpen, setIsModalAuthOpen] = useState(false)

	return (
		<div className={styles.product}>
			<Link href={`product/${wishProduct.id}`}>
				<Image
					src={wishProduct.img}
					alt={wishProduct.name}
					width={85}
					height={0}
					priority
					className={styles.img}
				/>
				<div className={styles.name}>{wishProduct.name}</div>
			</Link>
			<div className={styles.price}>${wishProduct.price}</div>
			<Button
				appearance='primary'
				className={isExistCart ? styles['btn-disabled'] : styles.btn}
				onClick={
					isExistCart
						? () => setIsModalAuthOpen(!isModalAuthOpen)
						: () => dispatch(cartActions.addProduct(wishProduct))
				}
			>
				{isExistCart ? 'To Cart' : 'Add to cart'}
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
						: () => dispatch(wishlistActions.removeProducts(wishProduct))
				}
			>
				<GarbageIcon className='h-6 w-6' />
			</Button>
			<ModalCart
				handleClose={() => setIsModalAuthOpen(!isModalAuthOpen)}
				isOpen={isModalAuthOpen}
			/>
		</div>
	)
}

export default WishlistItem
