import { Search } from '../svgs'
import styles from './SearcBar.module.scss'

const SearchBar = (): JSX.Element => {
	return (
		<form action='' className='relative mx-auto w-max'>
			<i className={styles['search-icon']}>
				<Search />
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
