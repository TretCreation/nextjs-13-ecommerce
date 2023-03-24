import { Button } from '@/src/components'
import { SearchIcon } from '../../../../../public'
import styles from './HeaderSearchBar.module.scss'

const HeaderSearchBar = (): JSX.Element => {
	return (
		<form action='' className={styles.form}>
			<i className={styles['search-icon']}>
				<SearchIcon className='w-5 h-5 stroke-red-300' />
			</i>
			<input
				type='search'
				className={styles['search-outline']}
				placeholder='search'
			/>
			<Button appearance='primary' className={styles['btn-search']}>
				Search
			</Button>
		</form>
	)
}

export default HeaderSearchBar
