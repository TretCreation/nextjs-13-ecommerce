import React from 'react'
import styles from './Pagination.module.scss'

const Pagination = () => {
	return (
		<ul className='inline-flex'>
			<li>
				<a href='#' className={styles.a}>
					1
				</a>
			</li>
			<li>
				<a href='#' className={styles.a}>
					2
				</a>
			</li>
			<li>
				<a href='#' className={styles.a}>
					3
				</a>
			</li>
		</ul>
	)
}

export default Pagination
