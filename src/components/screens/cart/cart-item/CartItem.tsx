import { GarbageIcon } from '@/public'
import { Button, useAppDispatch } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { cartActions } from '@/src/store'

import Image from 'next/image'
import { FC } from 'react'
import styles from './CartItem.module.scss'

interface ICartItemProps {
	cartProduct: IProduct
}

const CartItem: FC<ICartItemProps> = ({ cartProduct }) => {
	const dispatch = useAppDispatch()
	return (
		<div className={styles.product}>
			<Image
				src={cartProduct.img}
				alt={cartProduct.name}
				width={85}
				height={0}
				priority
				className={styles.img}
			/>
			<div className={styles.name}>{cartProduct.name}</div>
			<div className={styles.price}>${cartProduct.price}</div>
			<Button appearance='svg' className={styles.svg}>
				<GarbageIcon
					className='h-6 w-6'
					onClick={() =>
						dispatch(cartActions.removeProductCart(cartProduct))
					}
				/>
			</Button>
		</div>
	)
}

export default CartItem
