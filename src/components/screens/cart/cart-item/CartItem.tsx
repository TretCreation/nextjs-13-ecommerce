import { GarbageIcon } from '@/public'
import { Button, useAppDispatch } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { cartActions } from '@/src/store'
import { removeCartProducts } from '@/src/store/cart/cart.slice'
import { useSession } from 'next-auth/react'

import Image from 'next/image'
import { FC } from 'react'
import styles from './CartItem.module.scss'

interface ICartItemProps {
	cartProduct: IProduct
}

const CartItem: FC<ICartItemProps> = ({ cartProduct }) => {
	const dispatch = useAppDispatch()

	const { data: session, status } = useSession()
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
			<Button
				appearance='svg'
				className={styles.svg}
				onClick={
					status === 'authenticated'
						? () =>
								dispatch(
									removeCartProducts({
										product: cartProduct,
										productId: cartProduct.id,
										userId: session.user.id
									})
								)
						: () => dispatch(cartActions.removeProduct(cartProduct))
				}
			>
				<GarbageIcon className='h-6 w-6' />
			</Button>
		</div>
	)
}

export default CartItem
