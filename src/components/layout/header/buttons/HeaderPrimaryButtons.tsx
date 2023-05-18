import { AccountIcon, CartIcon, SignInIcon, WishlistIcon } from '@/public'
import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { fetchProducts } from '@/src/store/wishlist/wishlist.slice'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const dispatch = useAppDispatch()

	const [isModalCartOpen, setIsModalCartOpen] = useState<boolean>(false)

	const { wishProducts } = useAppSelector(state => state.wishlist)
	const { cartProducts } = useAppSelector(state => state.cart)

	const { data: session } = useSession()

	useEffect(() => {
		if (session) dispatch(fetchProducts(session.user.id))
	}, [dispatch, session])

	return (
		<>
			<div className={styles.btn}>
				<Link href='/wishlist'>
					<WishlistIcon className={styles.icon} />
					<span className={styles.span}>{wishProducts.length}</span>
					<p className={styles.text}>Wishlist</p>
				</Link>
				<Button appearance='svg' onClick={() => setIsModalCartOpen(!isModalCartOpen)}>
					<CartIcon className={styles.icon} />
					<span className={styles.span}>{cartProducts.length}</span>
					<p className='text-l'>Cart</p>
				</Button>
				<Link href={'/auth'}>
					<Button appearance='svg'>
						{session ? (
							<>
								<AccountIcon className={styles.icon} />
								<p className='text-l'>Account</p>
							</>
						) : (
							<>
								<SignInIcon className={styles.icon} />
								<p className='text-l'>Sign In</p>
							</>
						)}
					</Button>
				</Link>
			</div>
			<ModalCart
				handleClose={() => setIsModalCartOpen(!isModalCartOpen)}
				isOpen={isModalCartOpen}
			/>
		</>
	)
}

export default HeaderPrimaryButtons
