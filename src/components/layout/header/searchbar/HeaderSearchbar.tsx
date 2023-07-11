import { ChangeEvent, useEffect, useState } from 'react'

import { Button, Input, SearchBarList } from '@/src/components'
import useDebounce from '@/src/components/hooks/useDebounce'
import { IProduct } from '@/src/interfaces/product.interface'
import { SearchService } from '@/src/services/SearchService'

import { SearchIcon } from '../../../../../public'
import styles from './HeaderSearchBar.module.scss'

const HeaderSearchBar = (): JSX.Element => {
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500)

  const fetchData = async (value: string) => {
    const getSearchedProducts = await SearchService.getSearchedProducts(value)
    return setSearchedProducts(getSearchedProducts)
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchData(debouncedSearchTerm)
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
