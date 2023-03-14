import { Button } from '@/components'
import Link from 'next/link'
import React from 'react'
import styles from './HeaderSecondaryButtons.module.scss'

const HeaderSecondaryButtons = () => {
	return (
		<div className={styles.btn}>
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
