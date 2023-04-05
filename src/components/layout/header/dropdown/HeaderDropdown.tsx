import { MenuIcon } from '@/public'
import { Button } from '@/src/components'
import { FC, useRef, useState } from 'react'
import DropdownList from './dropdown-list/DropdownList'
import styles from './HeaderDropdown.module.scss'

interface IHeaderDropdownProps {
	isOpen: boolean
	handleClose: () => void
}

const HeaderDropdown: FC<IHeaderDropdownProps> = () => {
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<>
			<Button appearance='primary' onClick={() => setIsOpen(true)}>
				<div className={styles.btn}>
					<MenuIcon />
					All categories
				</div>
				<DropdownList
					isOpen={isOpen}
					handleClose={() => setIsOpen(!isOpen)}
				/>
			</Button>
		</>
	)

	//
}

export default HeaderDropdown
