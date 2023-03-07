import { SearchBar } from '@/components'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/logo.png'
import { AccountIcon, CartIcon, WishlistIcon } from '../../svgs'
import styles from './Header.module.scss'

const Header: NextPage = () => (
	<>
		<nav className={styles.nav}>
			<div className={styles['nav-container']}>
				<Link href='#'>
					<Image
						src={logo.src}
						alt='logo'
						className='w-28'
						width={500}
						height={500}
					/>
				</Link>
				<SearchBar />
				<div className={styles['nav-btn']}>
					<Link href='#'>
						<WishlistIcon className='w-7 h-7' />
						<p className='text-sm'>Wishlist</p>
					</Link>
					<Link href='#'>
						<CartIcon className='w-7 h-7' />
					</Link>
					<Link href='#'>
						<AccountIcon className='w-7 h-7' />
					</Link>
				</div>
			</div>
		</nav>
	</>
)

export default Header
