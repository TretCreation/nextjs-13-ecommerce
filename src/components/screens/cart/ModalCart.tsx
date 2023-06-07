import { CrossIcon } from '@/public'
import { Button, Modal, NoCartProducts, useAppSelector } from '@/src/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import CartItem from './cart-item/CartItem'
import styles from './ModalCart.module.scss'
import PaypalCheckoutButton from './paypal-button/PaypalCheckoutButton'

interface ICartProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalCart: FC<ICartProps> = ({ handleClose, isOpen }) => {
	const { data: session } = useSession()

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
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</div>
			) : (
				<NoCartProducts />
			)}
			{cartProducts.length !== 0 && (
				<div className={styles.checkout}>
					<p>Cart Subtotal: ${calculateSubtotal()}</p>
					<Link href={'/checkout'}>
						<Button appearance='primary'>Checkout</Button>
					</Link>
					<PaypalCheckoutButton
						subtotal={calculateSubtotal()}
						userId={session?.user.id}
						cartProducts={cartProducts.map(cartProduct => ({
							id: cartProduct.id,
							name: cartProduct.name,
							price: cartProduct.price,
							count: cartProduct.count
						}))}
					/>
				</div>
			)}
		</Modal>
	)
}

export default ModalCart
