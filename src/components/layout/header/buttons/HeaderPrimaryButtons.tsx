import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import { Button, ModalAuth } from '@/src/components'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './HeaderButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const [isModalAuthOpen, setIsModalAuthOpen] = useState(false)

	return (
		<div className={styles['btn-primary']}>
			<Link href='/wishlist'>
				<WishlistIcon className={styles.icon} />
				<p className={styles.text}>Wishlist</p>
			</Link>
			<Link href='#'>
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
