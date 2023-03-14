import { Dropdown, HeaderSecondaryButtons } from '@/components'
import React from 'react'
import styles from './HeaderSecondary.module.scss'

const SecondaryHeader = () => {
	return (
		<div className='bg-blue-dark py-3'>
			<div className={styles.nav}>
				<Dropdown />
				<HeaderSecondaryButtons />
			</div>
		</div>
	)
}

export default SecondaryHeader
