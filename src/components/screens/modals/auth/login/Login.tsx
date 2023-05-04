import { session } from '@/src/interfaces/user.interface'
import { FC } from 'react'
import styles from './Login.module.scss'

const Login: FC<{ session: session }> = session => {
	return (
		<div className={styles.login}>
			<div className={styles.info}>
				<p>info</p>
			</div>
			<div className={styles.main}>
				<p>Welcome, {session.user.email}</p>
			</div>
		</div>
	)
}

export default Login
