import { Button, SearchBarList } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import { ChangeEvent, useCallback, useState } from 'react'
import { SearchIcon } from '../../../../../public'
import styles from './HeaderSearchBar.module.scss'

const HeaderSearchBar = (): JSX.Element => {
	// const debouncedValue = useDebounce<string>(value, 500)
	const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		fetchData(e.target.value)
	}

	const fetchData = async (value: string) => {
		const getSearchedProducts = await ProductService.getSearchedProducts(
			value
		)
		return setSearchedProducts(getSearchedProducts)
	}

	const [isOpen, setIsOpen] = useState(false)

	const handleClose = useCallback(() => {
		setIsOpen(!isOpen)
	}, [isOpen])

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	console.log('Searched Products: ', searchedProducts)

	return (
		<>
			<form action='' className={styles.form} onSubmit={handleSubmit}>
				<span className={styles.span}>
					<SearchIcon className={styles.icon} />
				</span>
				<input
					type='search'
					placeholder='Search'
					className={styles.outline}
					onChange={handleInput}
				/>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={handleClose}
				>
					Search
				</Button>
			</form>
			<SearchBarList isOpen={isOpen} handleClose={handleClose} />
		</>
	)
}

export default HeaderSearchBar
