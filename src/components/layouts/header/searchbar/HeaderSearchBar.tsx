import { ChangeEvent, useEffect, useState } from 'react'

import { Button, Input } from '@/src/components'
import useDebounce from '@/src/hooks/useDebounce'
import { IProduct } from '@/src/interfaces/product.interface'
import { SearchService } from '@/src/services/search.service'
import { toastError } from '@/src/utils/api/handleToastError'

import { SearchIcon } from '../../../../assets'
import styles from './HeaderSearchBar.module.scss'
import SearchBarList from './searchbar-list/SearchBarList'

const HeaderSearchBar = (): JSX.Element => {
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      SearchService.getSearchedProducts(debouncedSearchTerm)
        .then(res => setSearchedProducts(res))
        .catch((error: Error) => toastError(error.message))
    }
  }, [debouncedSearchTerm])

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form action='' className={styles.form} onSubmit={handleSubmit}>
      <span className={styles.span}>
        <SearchIcon className={styles.icon} />
      </span>
      <Input
        appearance='primary'
        type='search'
        placeholder='Search'
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Button
        appearance='primary'
        className={styles.btn}
        // onClick={handleClose}
      >
        Search
      </Button>
      <SearchBarList searchedProducts={searchedProducts} />
    </form>
  )
}

export default HeaderSearchBar
