import { SearchIcon } from '../../svgs'
import styles from './SearcBar.module.scss'

const SearchBar = (): JSX.Element => {
	return (
		<form action='' className='relative w-100'>
			<i className={styles['search-icon']}>
				<SearchIcon />
			</i>
			<input
				type='search'
				className={styles['search-outline']}
				placeholder='Search'
			/>
		</form>
	)
}

export default SearchBar
