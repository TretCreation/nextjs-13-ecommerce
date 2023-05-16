import { Button } from '@/src/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './HeaderSecondaryButtons.module.scss'

const HeaderSecondaryButtons = () => {
	const { data: session } = useSession()
	console.log('session: ', session)

	return (
		<div className={styles.btn}>
			{/* <Link href='#'>
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
			</Link> */}
			//?
			{session?.user.role === 'ADMIN_ROLE' && (
				<Link href={'/auth/account/admin'}>
					<Button appearance='solid'>Admin</Button>
				</Link>
			)}
		</div>
	)
}

export default HeaderSecondaryButtons
