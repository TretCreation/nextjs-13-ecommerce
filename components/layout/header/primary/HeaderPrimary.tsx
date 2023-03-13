import {
	HeaderPrimaryButtons,
	HeaderPrimaryLogo,
	HeaderPrimarySearchBar
} from '@/components'
import styles from './HeaderPrimary.module.scss'

const HeaderPrimary = () => {
	return (
		<div className={styles.nav}>
			<HeaderPrimaryLogo />
			<HeaderPrimarySearchBar />
			<HeaderPrimaryButtons />
		</div>
	)
}

export default HeaderPrimary
