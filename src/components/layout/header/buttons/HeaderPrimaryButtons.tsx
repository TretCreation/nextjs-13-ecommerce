import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import { Button, ModalAuth, useAppSelector } from '@/src/components'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const [isModalAuthOpen, setIsModalAuthOpen] = useState(false)
	const { wishProducts } = useAppSelector(state => state.wishlist)

	return (
		<div className={styles.btn}>
			<Link href='/wishlist'>
				<WishlistIcon className={styles.icon} />
				<span className={styles.span}>{wishProducts.length}</span>
				<p className={styles.text}>Wishlist</p>
			</Link>
			<Link href='/'>
				<CartIcon className={styles.icon} />
				<p className='text-l'>Cart</p>
			</Link>
			<Button
				appearance='svg'
				onClick={() => setIsModalAuthOpen(!isModalAuthOpen)}
			>
				<AccountIcon className={styles.icon} />
				<p className='text-l'>Account</p>
			</Button>
			<ModalAuth
				handleClose={() => setIsModalAuthOpen(!isModalAuthOpen)}
				isOpen={isModalAuthOpen}
			/>
		</div>
	)
}

export default HeaderPrimaryButtons
