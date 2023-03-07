import { Button } from '@/components'
import { SearchIcon } from '../../svgs'
import styles from './SearchBar.module.scss'

const SearchBar = (): JSX.Element => {
	return (
		<form
			action=''
			className='flex relative w-100 border border-primary rounded-md'
		>
			<i className={styles['search-icon']}>
				<SearchIcon className='w-5 h-5' />
			</i>
			<input
				type='search'
				className={styles['search-outline']}
				placeholder='search'
			/>
			<Button appearance='primary-solid'>Search</Button>
		</form>
	)
}

export default SearchBar
