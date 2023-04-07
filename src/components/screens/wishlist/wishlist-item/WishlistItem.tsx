import { GarbageIcon } from '@/public'
import { Button } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './WishlistItem.module.scss'

interface IWishlistItemProps {
	product: IProduct
}

const WishlistItem: FC<IWishlistItemProps> = ({ product }) => {
	return (
		<div className={styles.product}>
			<Image
				src={product.img}
				alt={product.name}
				width={85}
				height={0}
				priority
				className={styles.img}
			/>
			<div className={styles.name}>{product.name}</div>
			<div className={styles.price}>${product.price}</div>
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
