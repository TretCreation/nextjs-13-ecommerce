import { HeaderLogo } from '@/src/components'
import { NextPage } from 'next'
import styles from './HeaderAppProps.module.scss'

const HeaderAppProps: NextPage = () => (
	<nav className={styles.nav}>
		<HeaderLogo />
	</nav>
)

export default HeaderAppProps
