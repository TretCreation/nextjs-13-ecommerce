import { AccountCardIcon, ArchiveIcon, LogoutIcon, PaymentIcon, WishlistIcon } from '@/public'
import { Button, Wishlist } from '@/src/components'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Account.module.scss'

const Account = () => {
	const { data: session, status } = useSession()

	const [component, setComponent] = useState<string>()

	if (status === 'loading') return <div>Loading...</div>

	if (session && session.user) {
		return (
			<div className={styles.account}>
				<div className={styles.info}>
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
								<p className={styles['text-light']}>Profile Information</p>
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
								<Link href={'/wishlist'}>
									<WishlistIcon className={styles.icon} />
									<p className={styles['text-dark']}>My Wishlist</p>
								</Link>
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
				</div>
				<div className={styles.main}>
					{component === 'wishlist' ? (
						<Wishlist />
					) : component === 'order history' ? (
						<p>Order History</p>
					) : null}
				</div>
			</div>
		)
	}
	return <div>Access Denied</div>
}

export default Account
