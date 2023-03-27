import { Button } from '@/src/components'
import { SearchIcon } from '../../../../../public'
import styles from './HeaderSearchBar.module.scss'

const HeaderSearchBar = (): JSX.Element => {
	return (
		<form action='' className={styles.form}>
			<i className={styles.icon}>
				<SearchIcon className='h-5 w-5 stroke-red-300' />
			</i>
			<input
				type='search'
				className={styles.outline}
				placeholder='search'
			/>
			<Button appearance='primary' className={styles.btn}>
				Search
			</Button>
		</form>
	)
}

export default HeaderSearchBar
