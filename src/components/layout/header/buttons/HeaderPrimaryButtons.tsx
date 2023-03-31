import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import { Button, ModalAuth } from '@/src/components'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './HeaderButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const [isModalAuthOpen, setIsModalAuthOpen] = useState(false)
	// const [isScrollLocked] = useScrollBlock()

	return (
		<div className={styles['btn-primary']}>
			{/* <Button appearance='svg' onClick={() => isScrollLocked()}>
				<WishlistIcon className={styles.icon} />
				<p className={styles.text}>Wishlist</p>
			</Button> */}

			<Button
				appearance='svg'
				onClick={() => setIsModalAuthOpen(!isModalAuthOpen)}
			>
				<WishlistIcon className={styles.icon} />
				<p className={styles.text}>Wishlist</p>
			</Button>

			<Link href='#'>
				<CartIcon className='mx-3 flex h-6 w-6' />
				<p className='text-l'>Cart</p>
			</Link>
			<Link href='#'>
				<AccountIcon className='mx-3 flex h-6 w-6' />
				<p className='text-l'>Account</p>
			</Link>

			<ModalAuth
				handleClose={() => setIsModalAuthOpen(false)}
				isModalAuthOpen={isModalAuthOpen}
			/>
		</div>
	)
}

export default HeaderPrimaryButtons
