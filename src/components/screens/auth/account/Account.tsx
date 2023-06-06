import { AccountCardIcon, ArchiveIcon, LogoutIcon } from '@/public'
import { Button, ManageAccount, OrderHistory, ProfileInfo } from '@/src/components'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import styles from './Account.module.scss'

const Account = () => {
	const { data: session, status } = useSession()

	const [component, setComponent] = useState<string>('info')

	// useEffect(() => {
	// 	console.log('component', component)
	// }, [component])

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
							{/* <Button
								appearance='solid'
								className={styles.btn}
								onClick={() => setComponent('manage')}
							>
								<AccountCardIcon className={styles.icon} />
								<p className={styles['text-dark']}>Manage Account</p>
							</Button> */}
							<Button
								appearance='solid'
								className={styles.btn}
								onClick={() => setComponent('info')}
							>
								<AccountCardIcon className={styles.icon} />
								<p className={styles['text-dark']}>Profile Information</p>
							</Button>
							{/* <Button appearance='solid' className={styles.btn}>
								<p className={styles['text-light']}>Change Password</p>
							</Button> */}
						</div>
						<div className={styles.block}>
							<Button
								appearance='solid'
								className={styles.btn}
								onClick={() => setComponent('history')}
							>
								<ArchiveIcon className={styles.icon} />
								<p className={styles['text-dark']}>My Order History</p>
							</Button>
							{/* <Button appearance='solid' className={styles.btn}>
								<p className={styles['text-light']}>My Returns?</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles['text-light']}>My Reviews?</p>
							</Button> */}
						</div>
						{/* <div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<PaymentIcon className={styles.icon} />
								<p className={styles['text-dark']}>Payment Methods</p>
							</Button>
						</div> */}
						{/* <div className={styles.block}>
							<Button
								appearance='solid'
								className={styles.btn}
								onClick={() => setComponent('wishlist')}
							>
								<Link href={'/wishlist'}>
								<WishlistIcon className={styles.icon} />
								<p className={styles['text-dark']}>My Wishlist</p>
								</Link>
							</Button>
						</div> */}
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
					{component === 'manage' ? (
						<ManageAccount />
					) : component === 'history' ? (
						<OrderHistory />
					) : component === 'info' ? (
						<ProfileInfo />
					) : // ) : component === 'wishlist' ? (
					// 	<Wishlist />
					null}
				</div>
			</div>
		)
	}
	return <div>Access Denied</div>
}

export default Account
