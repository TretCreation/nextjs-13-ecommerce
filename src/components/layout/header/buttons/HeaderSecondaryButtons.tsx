import { Button } from '@/src/components'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './HeaderSecondaryButtons.module.scss'

const HeaderSecondaryButtons = () => {
	const { data: session } = useSession()

	return (
		<>
			{session?.user.role === 'ADMIN_ROLE' && (
				<Link href={'/admin'} className={styles.btn}>
					<Button appearance='solid'>Admin</Button>
				</Link>
			)}
		</>
	)
}

export default HeaderSecondaryButtons
