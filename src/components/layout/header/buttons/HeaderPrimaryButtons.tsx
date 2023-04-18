import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import { Button, ModalAuth, ModalCart, useAppSelector } from '@/src/components'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const [isModalAuthOpen, setIsModalAuthOpen] = useState(false)
	const [isModalCartOpen, setIsModalCartOpen] = useState(false)
	const { wishProducts } = useAppSelector(state => state.wishlist)

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
