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
			{/* <div className={styles['nav-container']}> */}
			<Link href='#'>
				<Image
					src={logo.src}
					alt='logo'
					className=''
					width={160}
					height={100}
				/>
			</Link>
			<SearchBar />
			<div className={styles['nav-btn']}>
				<Link href='#'>
					<WishlistIcon className={styles['nav-btn-one']} />
					<p className='text-l'>Wishlist</p>
				</Link>
				<Link href='#'>
					<CartIcon className={styles['nav-btn-one']} />
					<p className='text-l'>Cart</p>
				</Link>
				<Link href='#'>
					<AccountIcon className={styles['nav-btn-one']} />
					<p className='text-l'>Account</p>
				</Link>
			</div>
			{/* </div> */}
		</nav>
	</>
)

export default Header
