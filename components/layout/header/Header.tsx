import {
	HeaderDropdown,
	HeaderPrimaryButtons,
	HeaderPrimaryLogo,
	HeaderPrimarySearchBar,
	HeaderSecondaryButtons
} from '@/components'
import { NextPage } from 'next'
import styles from './Header.module.scss'

const Header: NextPage = () => (
	<nav>
		<div className={styles['nav-primary']}>
			<HeaderPrimaryLogo />
			<HeaderPrimarySearchBar />
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
