import { Button, Dropdown, SearchBar } from '@/components'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/logo.png'
import { AccountIcon, CartIcon, WishlistIcon } from '../../svgs'
import styles from './Header.module.scss'

const Header: NextPage = () => (
	<nav>
		<div className={styles['nav-first']}>
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
			<div className={styles['nav-first-btn']}>
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
		</div>
		<div className='bg-blue-dark py-3'>
			<div className={styles['nav-second']}>
				<Dropdown />
				<div className={styles['nav-second-btn']}>
					<Link href='#'>
						<Button appearance='solid'>Home</Button>
					</Link>
					<Link href='#'>
						<Button appearance='solid'>Shop</Button>
					</Link>
					<Link href='#'>
						<Button appearance='solid'>About Us</Button>
					</Link>
					<Link href='#'>
						<Button appearance='solid'>Contact Us</Button>
					</Link>
				</div>
			</div>
		</div>
	</nav>
)

export default Header
