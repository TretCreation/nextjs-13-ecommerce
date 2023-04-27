import { MenuIcon } from '@/public'
import { Button } from '@/src/components'
import { NextPage } from 'next'
import { useState } from 'react'
import DropdownList from './dropdown-list/DropdownList'
import styles from './HeaderDropdown.module.scss'

const HeaderDropdown: NextPage = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleClose = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.dropdown}>
			<Button appearance='primary' onClick={() => setIsOpen(true)}>
				<div className={styles.btn}>
					<MenuIcon />
					All categories
				</div>
				<DropdownList isOpen={isOpen} handleClose={handleClose} />
			</Button>
		</div>
	)
}

export default HeaderDropdown
