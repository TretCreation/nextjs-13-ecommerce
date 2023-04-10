import { GarbageIcon } from '@/public'
import { Button } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './WishlistItem.module.scss'

interface IWishlistItemProps {
	wishProduct: IProduct
}

const WishlistItem: FC<IWishlistItemProps> = ({ wishProduct }) => {
	return (
		<div className={styles.product}>
			<Image
				src={wishProduct.img}
				alt={wishProduct.name}
				width={85}
				height={0}
				priority
				className={styles.img}
			/>
			<div className={styles.name}>{wishProduct.name}</div>
			<div className={styles.price}>${wishProduct.price}</div>
			<Button appearance='primary' className={styles.btn}>
				Add to cart
			</Button>
			<Button appearance='svg' className={styles.svg}>
				<GarbageIcon className='h-6 w-6' />
			</Button>
		</div>
	)
}

export default WishlistItem
