import { useSession } from 'next-auth/react'

import { NoWishlistProducts } from '../..'
import { useAppSelector } from '../../hooks/useAppSelector'
import WishlistItem from './wishlist-item/WishlistItem'
import styles from './Wishlist.module.scss'

const Wishlist = () => {
  const { wishlist } = useAppSelector(state => state)

  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>

  if (session && session.user) {
    return (
      <div className={styles.wishlist}>
        {/* <div className={styles.info}>
					<div className={styles.card}>
						<Image
							src={session.user.img || session.user.image}
							alt='user avatar'
							width={96}
							height={96}
							className={styles.img}
							priority
						/>
						<div className={styles.text}>
							<p className={styles['text-light']}>Hello,</p>
							<p>{session.user.name}</p>
						</div>
					</div>
					<div className={styles.options}>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<AccountCardIcon className={styles.icon} />
								<p className={styles['text-dark']}>Manage Account</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<AccountCardIcon className={styles.icon} />
								<p className={styles['text-dark']}>Profile Information</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles['text-light']}>Change Password</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<ArchiveIcon className={styles.icon} />
								<p className={styles['text-dark']}>My Order History</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles['text-light']}>My Returns?</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles['text-light']}>My Reviews?</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<PaymentIcon className={styles.icon} />
								<p className={styles['text-dark']}>Payment Methods</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<WishlistIcon className={styles.icon} />
								<p className={styles['text-dark']}>My Wishlist</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button
								appearance='solid'
								className={styles.btn}
								onClick={() => signOut({ callbackUrl: '/' })}
							>
								<LogoutIcon className={styles.icon} />
								<p className={styles['text-dark']}>Logout</p>
							</Button>
						</div>
					</div>
				</div> */}
        <div className={styles.products}>
          <h1>Your Wishlist</h1>
          {wishlist.wishProducts.length > 0 ? (
            wishlist.wishProducts.map(wishProduct => (
              <WishlistItem key={wishProduct.id} wishProduct={wishProduct} />
            ))
          ) : (
            <NoWishlistProducts />
          )}
        </div>
      </div>
    )
  }
  return (
    <div className={styles.wishlist}>
      <div className={styles.products}>
        {wishlist.wishProducts.length > 0 ? (
          wishlist.wishProducts.map(wishProduct => (
            <WishlistItem key={wishProduct.id} wishProduct={wishProduct} />
          ))
        ) : (
          <NoWishlistProducts />
        )}
      </div>
    </div>
  )
}

export default Wishlist
