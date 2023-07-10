import Link from 'next/link'
import { FC } from 'react'

import { CrossIcon } from '@/public'
import { Button, Modal, NoCartProducts, useAppSelector } from '@/src/components'
import { getCheckoutHomeUrl } from '@/src/configs/url.config'

import CartItem from './cart-item/CartItem'
import styles from './ModalCart.module.scss'

interface ICartProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalCart: FC<ICartProps> = ({ handleClose, isOpen }) => {
	const { cartProducts } = useAppSelector(state => state.cart)

	const calculateSubtotal = (): number => {
		let subtotal = 0
		cartProducts.forEach(product => {
			subtotal += product.price * product.count
		})

		return subtotal
	}

	if (!isOpen) return null
	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<div className={styles.header}>
				<p>Cart:</p>
				<Button appearance='svg'>
					<CrossIcon onClick={handleClose} className='h-5 w-5' />
				</Button>
			</div>
			{cartProducts.length > 0 ? (
				<div className={styles.products}>
					{cartProducts.map(cartProduct => (
						<CartItem
							key={cartProduct.id}
							cartProduct={cartProduct}
							handleClose={handleClose}
						/>
					))}
				</div>
			) : (
				<NoCartProducts />
			)}
			{cartProducts.length !== 0 && (
				<div className={styles.checkout}>
					<p>Cart Subtotal: ${calculateSubtotal()}</p>
					<Link href={getCheckoutHomeUrl}>
						<Button appearance='primary'>Checkout</Button>
					</Link>
				</div>
			)}
		</Modal>
	)
}

export default ModalCart
