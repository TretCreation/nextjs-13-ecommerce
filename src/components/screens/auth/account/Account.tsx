import {
	AccountCardIcon,
	ArchiveIcon,
	LogoutIcon,
	PaymentIcon,
	WishlistIcon
} from '@/public'
import { Button } from '@/src/components'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import styles from './Account.module.scss'

const Account = () => {
	const { data: session, status } = useSession()

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
							className='mb-2'
							priority
						/>
						{/* //? font-family: inherit */}
						<p>Hello, {session.user.name}</p>
					</div>
					<div className={styles.options}>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<AccountCardIcon className={styles.icon} />
								<p className={styles.text}>Manage Account</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles.text}>Profile Information</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles.text}>Change Password</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<ArchiveIcon className={styles.icon} />
								<p className={styles.text}>My Order History</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles.text}>My Returns?</p>
							</Button>
							<Button appearance='solid' className={styles.btn}>
								<p className={styles.text}>My Reviews?</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<PaymentIcon className={styles.icon} />
								<p className={styles.text}>Payment Methods</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button appearance='solid' className={styles.btn}>
								<WishlistIcon className={styles.icon} />
								<p className={styles.text}>My Wishlist</p>
							</Button>
						</div>
						<div className={styles.block}>
							<Button
								appearance='solid'
								className={styles.btn}
								onClick={() => signOut({ callbackUrl: '/' })}
							>
								<LogoutIcon className={styles.icon} />
								<p className={styles.text}>Logout</p>
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.main}>
					<h2>Last purchases:</h2>
					<p>main</p>
				</div>
			</div>
		)
	}
	return <div>Access Denied</div>
}

export default Account
