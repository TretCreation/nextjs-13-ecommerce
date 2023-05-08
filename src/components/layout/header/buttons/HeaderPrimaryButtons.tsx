import { AccountIcon, CartIcon, WishlistIcon } from '@/public'
import { Button, ModalCart, useAppSelector } from '@/src/components'
import ModalAuthPage from '@/src/pages/auth'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const [isModalAuthOpen, setIsModalAuthOpen] = useState<boolean>(false)
	const [isModalCartOpen, setIsModalCartOpen] = useState<boolean>(false)

	const { wishProducts } = useAppSelector(state => state.wishlist)
	const { cartProducts } = useAppSelector(state => state.cart)

	const { data: session } = useSession()

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
				{session ? (
					<Link href={'/auth/account'}>
						<Button appearance='svg'>
							<AccountIcon className={styles.icon} />
							<p className='text-l'>Account</p>
						</Button>
					</Link>
				) : (
					//?
					// <Button
					// 	appearance='svg'
					// 	onClick={() => setIsModalAuthOpen(!isModalAuthOpen)}
					// >
					// 	<AccountIcon className={styles.icon} />
					// 	<p className='text-l'>Account</p>
					// </Button>
					<Button appearance='svg' onClick={() => signIn()}>
						<AccountIcon className={styles.icon} />
						<p className='text-l'>Account</p>
					</Button>
				)}
			</div>
			<ModalAuthPage
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
