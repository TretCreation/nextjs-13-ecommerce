import Button from '@/src/components/ui/button/Button'
import { FC } from 'react'
import styles from './DropdownItem.module.scss'

interface IDropdownItemProps {
	text: string
	svg?: any
}

const DropdownItem: FC<IDropdownItemProps> = ({ text, svg }) => {
	return (
		<Button className={styles.item} appearance='solid'>
			<div className={styles.svg}>{svg}</div>
			<p className={styles.text}>{text}</p>
		</Button>
	)
}

export default DropdownItem
