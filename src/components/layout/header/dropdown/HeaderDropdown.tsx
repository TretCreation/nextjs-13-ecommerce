import { NextPage } from 'next'
import { useState } from 'react'

import { MenuIcon } from '@/public'
import { Button } from '@/src/components'

import DropdownList from './dropdown-list/DropdownList'
import styles from './HeaderDropdown.module.scss'

const HeaderDropdown: NextPage = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Button appearance='primary' onClick={() => setIsOpen(!isOpen)} className={styles.btn}>
			<MenuIcon className={styles.svg} />
			<p>All categories</p>
			<DropdownList isOpen={isOpen} handleClose={() => setIsOpen(!isOpen)} />
		</Button>
	)
}

export default HeaderDropdown
