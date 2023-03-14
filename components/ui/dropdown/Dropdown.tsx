import { Button } from '@/components'
import { MenuIcon } from '@/public'
import React from 'react'
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
