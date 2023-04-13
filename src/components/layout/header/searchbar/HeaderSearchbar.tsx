import { Button } from '@/src/components'
import useDebounce from '@/src/components/hooks/useDebounce'
import { ChangeEvent, useState } from 'react'
import { SearchIcon } from '../../../../../public'
import styles from './HeaderSearchBar.module.scss'

const HeaderSearchBar = (): JSX.Element => {
	const [value, setValue] = useState<string>('')
	const debouncedValue = useDebounce<string>(value, 500)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		<>
			<p>Value real-time: {value}</p>
			<p>Debounced value: {debouncedValue}</p>
			<form action='' className={styles.form}>
				<span className={styles.span}>
					<SearchIcon className={styles.icon} />
					{/* stroke-red-300 */}
				</span>
				<input
					type='search'
					className={styles.outline}
					placeholder='search'
					onChange={handleChange}
				/>
				<Button appearance='primary' className={styles.btn}>
					Search
				</Button>
			</form>
		</>
	)
}

export default HeaderSearchBar
