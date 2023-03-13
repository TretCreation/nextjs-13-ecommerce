import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import Link from 'next/link'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons = () => {
	return (
		<div className={styles.btn}>
			<Link href='#'>
				<WishlistIcon className='flex w-6 h-6 mx-3' />
				<p className='text-l'>Wishlist</p>
			</Link>
			<Link href='#'>
				<CartIcon className='flex w-6 h-6 mx-3' />
				<p className='text-l'>Cart</p>
			</Link>
			<Link href='#'>
				<AccountIcon className='flex w-6 h-6 mx-3' />
				<p className='text-l'>Account</p>
			</Link>
		</div>
	)
}

export default HeaderPrimaryButtons
