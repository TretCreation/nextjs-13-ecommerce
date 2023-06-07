import { HeaderLogo } from '@/src/components'
import { NextPage } from 'next'
import styles from './Header.module.scss'

const Header: NextPage = () => (
	<nav className={styles.nav}>
		<HeaderLogo />
	</nav>
)

export default Header
