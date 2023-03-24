import {
	HeaderDropdown,
	HeaderPrimaryButtons,
	HeaderLogo,
	HeaderSearchBar,
	HeaderSecondaryButtons
} from '@/src/components'
import { NextPage } from 'next'
import styles from './Header.module.scss'

const Header: NextPage = () => (
	<nav>
		<div className={styles['nav-primary']}>
			<HeaderLogo />
			<HeaderSearchBar />
			<HeaderPrimaryButtons />
		</div>
		<div className='bg-blue-dark py-3'>
			<div className={styles['nav-secondary']}>
				<HeaderDropdown />
				<HeaderSecondaryButtons />
			</div>
		</div>
	</nav>
)

export default Header
