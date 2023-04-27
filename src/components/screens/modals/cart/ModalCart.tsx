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
			{cartProducts.length > 0 ? (
				<div className={styles.content}>
					<Button appearance='svg'>
						<CrossIcon onClick={handleClose} className='h-5 w-5' />
					</Button>
					<div className={styles.products}>
						{cartProducts.map(cartProduct => (
							<CartItem
								key={cartProduct.id}
								cartProduct={cartProduct}
							/>
						))}
					</div>
					<div className={styles.checkout}>
						<p>
							Cart Subtotal: $
							{cartProducts.reduce(
								(acc, cur) => acc + cur.price,
								0
							)}
						</p>
					</div>
				</div>
			) : (
				<NoCartProducts />
			)}
		</Modal>
	)
}

export default ModalCart
