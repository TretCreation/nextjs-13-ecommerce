import { GarbageIcon } from '@/public'
import { Button, useAppDispatch } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { actions as wishlistActions } from '@/src/store/wishlist/wishlist.slice'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './WishlistItem.module.scss'

interface IWishlistItemProps {
	wishProduct: IProduct
}

const WishlistItem: FC<IWishlistItemProps> = ({ wishProduct }) => {
	const dispatch = useAppDispatch()

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
			<Button appearance='primary' className={styles.btn}>
				Add to cart
			</Button>
			<Button appearance='svg' className={styles.svg}>
				<GarbageIcon
					className='h-6 w-6'
					onClick={() =>
						dispatch(
							wishlistActions.removeProductWishlist(wishProduct)
						)
					}
				/>
			</Button>
		</div>
	)
}

export default WishlistItem
