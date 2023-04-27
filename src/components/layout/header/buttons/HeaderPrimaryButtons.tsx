import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import { Button, ModalAuth, ModalCart, useAppSelector } from '@/src/components'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const [isModalAuthOpen, setIsModalAuthOpen] = useState<boolean>(false)
	const [isModalCartOpen, setIsModalCartOpen] = useState<boolean>(false)

	const { wishProducts } = useAppSelector(state => state.wishlist)
	const { cartProducts } = useAppSelector(state => state.cart)

	return (
		<>
			<div className={styles.btn}>
				<Link href='/wishlist'>
					<WishlistIcon className={styles.icon} />
					<span className={styles.span}>{wishProducts.length}</span>
					<p className={styles.text}>Wishlist</p>
				</Link>
				<Button
					appearance='svg'
					onClick={() => setIsModalCartOpen(!isModalCartOpen)}
				>
					<CartIcon className={styles.icon} />
					<span className={styles.span}>{cartProducts.length}</span>
					<p className='text-l'>Cart</p>
				</Button>
				<Button
					appearance='svg'
					onClick={() => setIsModalAuthOpen(!isModalAuthOpen)}
				>
					<AccountIcon className={styles.icon} />
					<p className='text-l'>Account</p>
				</Button>
			</div>
			<ModalAuth
				handleClose={() => setIsModalAuthOpen(!isModalAuthOpen)}
				isOpen={isModalAuthOpen}
			/>
			<ModalCart
				handleClose={() => setIsModalCartOpen(!isModalCartOpen)}
				isOpen={isModalCartOpen}
			/>
		</>
	)
}

export default HeaderPrimaryButtons
