import { Button, SearchBarList } from '@/src/components'
import useDebounce from '@/src/components/hooks/useDebounce'
import { IProduct } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { SearchIcon } from '../../../../../public'
import styles from './HeaderSearchBar.module.scss'

const HeaderSearchBar = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

	const fetchData = async (value: string) => {
		const getSearchedProducts = await ProductService.getSearchedProducts(
			value
		)
		return setSearchedProducts(getSearchedProducts)
	}

	const handleClose = useCallback(() => {
		setIsOpen(!isOpen)
	}, [isOpen])

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchData(debouncedSearchTerm)
			setIsOpen(!isOpen)
		}
	}, [debouncedSearchTerm])

	console.log('debouncedSearchTerm', debouncedSearchTerm)
	console.log('isOpen: ', isOpen)
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
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<Button
					appearance='primary'
					className={styles.btn}
					// onClick={handleClose}
				>
					Search
				</Button>
			</form>
			<SearchBarList
				isOpen={isOpen}
				handleClose={handleClose}
				searchedProducts={searchedProducts}
			/>
		</>
	)
}

export default HeaderSearchBar
