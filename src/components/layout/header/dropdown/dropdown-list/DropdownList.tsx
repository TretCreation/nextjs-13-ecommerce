import { FC, useEffect, useRef, useState } from 'react'

import { useEscape, useOutside } from '@/src/components'
import { IType } from '@/src/interfaces/type.interface'
import { TypeService } from '@/src/services/TypeService'

import DropdownItem from '../dropdown-item/DropdownItem'
import styles from './DropdownList.module.scss'

interface IDropdownListProps {
	isOpen: boolean
	handleClose: () => void
}

const DropdownList: FC<IDropdownListProps> = ({ isOpen, handleClose }) => {
	const ref = useRef<HTMLDivElement>(null)
	const [types, setTypes] = useState<IType[]>([])

	useEffect(() => {
		TypeService.getAllTypes().then(types => setTypes(types))
	}, [])

	//* Close modal on click outside
	useOutside(ref, () => handleClose(), isOpen)

	//* Close modal on escape
	useEscape(handleClose, isOpen)

	if (!isOpen) return null
	return (
		<div className={styles.list} ref={ref}>
			{/* <DropdownItem
				svg={<SmartphoneIcon className={styles.svg} />}
				text='Smartphones'
				href='/category/smartphones'
			/>
			<DropdownItem
				svg={<LaptopIcon className={styles.svg} />}
				text='Laptops'
				href='/category/laptops'
			/>
			<DropdownItem
				svg={<WatchIcon className={styles.svg} />}
				text='Watches'
				href='/category/watches'
			/>
			<DropdownItem
				svg={<HeadphonesIcon className={styles.svg} />}
				text='Headphones'
				href='/category/headphones'
			/> */}
			{types.map(type => (
				<DropdownItem
					key={type.id}
					svg={''}
					text={type.name}
					href={`/category/${type.name.toLowerCase()}`}
				/>
			))}
		</div>
	)
}

export default DropdownList
