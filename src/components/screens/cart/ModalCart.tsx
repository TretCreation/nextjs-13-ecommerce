import { CrossIcon } from '@/public'
import { Button, Modal, NoCartProducts, useAppSelector } from '@/src/components'
import { FC } from 'react'
import CartItem from './cart-item/CartItem'
import styles from './ModalCart.module.scss'

interface ICartProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalCart: FC<ICartProps> = ({ handleClose, isOpen }) => {
	const { cartProducts } = useAppSelector(state => state.cart)
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
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</div>
			) : (
				<NoCartProducts />
			)}
			{cartProducts.length !== 0 && (
				<div className={styles.checkout}>
					<p>Cart Subtotal: ${cartProducts.reduce((acc, cur) => acc + cur.price, 0)}</p>
					{/* <PaypalCheckoutButton /> */}
				</div>
			)}
		</Modal>
	)
}

export default ModalCart
