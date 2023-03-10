import { Button } from '@/components'
import { MenuIcon } from '@/components/svgs'
import styles from './Dropdown.module.scss'

const Dropdown = () => {
	return (
		<>
			<Button appearance='primary' className={styles.dropdown}>
				<MenuIcon />
				All Categories
			</Button>
		</>
	)
}

export default Dropdown
