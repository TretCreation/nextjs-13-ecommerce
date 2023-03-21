import { Button } from '@/src/components'
import Link from 'next/link'
import React from 'react'
import styles from './HeaderButtons.module.scss'

const HeaderSecondaryButtons = () => {
	return (
		<div className={styles['btn-secondary']}>
			<Link href='#'>
				<Button appearance='solid'>Home</Button>
			</Link>
			<Link href='#'>
				<Button appearance='solid'>Shop</Button>
			</Link>
			<Link href='#'>
				<Button appearance='solid'>About Us</Button>
			</Link>
			<Link href='#'>
				<Button appearance='solid'>Contact Us</Button>
			</Link>
		</div>
	)
}

export default HeaderSecondaryButtons