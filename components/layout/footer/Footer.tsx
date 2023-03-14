import React from 'react'
import styles from './Footer.module.scss'

const Footer = (): JSX.Element => {
	return (
		<footer className={styles.footer}>
			<span className={styles.span}>
				© 2023{' '}
				<a href='#' className='hover:underline'>
					TretStudio™
				</a>
				. All Rights Reserved.
			</span>
			<ul className={styles.ul}>
				<li>
					<a href='#' className={styles.li}>
						About
					</a>
				</li>
				<li>
					<a href='#' className={styles.li}>
						Privacy Policy
					</a>
				</li>
				<li>
					<a href='#' className={styles.li}>
						Licensing
					</a>
				</li>
				<li>
					<a href='#' className='hover:underline'>
						Contact
					</a>
				</li>
			</ul>
		</footer>
	)
}

export default Footer
