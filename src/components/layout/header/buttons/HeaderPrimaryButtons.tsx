import { AccountIcon, CartIcon, SignInIcon, WishlistIcon } from '@/public'
import { Button, ModalCart, useAppDispatch, useAppSelector } from '@/src/components'
import { WishlistService } from '@/src/services/WishlistService'
import { wishlistActions } from '@/src/store'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styles from './HeaderPrimaryButtons.module.scss'

const HeaderPrimaryButtons: FC = () => {
	const dispatch = useAppDispatch()

	const [isModalCartOpen, setIsModalCartOpen] = useState<boolean>(false)

	const { wishProducts } = useAppSelector(state => state.wishlist)
	const { cartProducts } = useAppSelector(state => state.cart)

	const { data: session, status } = useSession()

	useEffect(() => {
		async function fetchProducts() {
			if (session) {
				const data = await WishlistService.getById(session.user.id)
				console.log('data', data)
				dispatch(wishlistActions.updateProducts(data))
			}
		}
		fetchProducts()
	}, [session])

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
