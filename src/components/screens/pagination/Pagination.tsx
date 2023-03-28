import { LeftArrowIcon, RightArrowIcon } from '@/public'
import { FC } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
	current: number
	onChange(page: number): void
	limit: boolean
}

const Pagination: FC<PaginationProps> = ({ current, onChange, limit }) => {
	const increment = () => onChange(current + 1)
	const decrement = () => onChange(current - 1)

	return (
		<div className={styles.pagination}>
			<div className={styles.btn} onClick={decrement}>
				<LeftArrowIcon />
			</div>
			<div className={styles.btn}>{current}</div>
			<div className={styles.btn} onClick={increment}>
				<RightArrowIcon />
			</div>
		</div>
	)
}

export default Pagination
