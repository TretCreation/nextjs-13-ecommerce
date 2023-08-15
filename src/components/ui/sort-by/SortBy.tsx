import { ChangeEvent, FC, useEffect, useState } from 'react'

import { SortKey, SortValue, TypeId } from '@/src/interfaces/api.type'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'

import styles from './SortBy.module.scss'

interface ISortBy {
  limit: number
  q: TypeId | any
  currentPage: number
  brandId: number | number[] | undefined
  getProducts: (products: IProduct[]) => void
  setCurrentPage: (currentPage: number) => void
}

const SortBy: FC<ISortBy> = ({ limit, q, getProducts, setCurrentPage, currentPage, brandId }) => {
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])
  const [getKey, setGetKey] = useState<SortKey>('r')
  const [getValue, setGetValue] = useState<SortValue>('desc')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async (selectEvent: ChangeEvent<HTMLSelectElement>) => {
    const options: { [key: string]: [SortKey, SortValue] } = {
      low: ['p', 'asc'],
      high: ['p', 'desc'],
      rating: ['r', 'desc']
    }
    const [k, v] = options[selectEvent.target.value]
    filterProducts(k, v)
  }

  const filterProducts = async (key: SortKey, value: SortValue) => {
    setSortedProducts([])
    setGetKey(key)
    setGetValue(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    setIsLoading(true)

    SortByService.getSortedProducts(getKey, getValue, q, limit, currentPage, brandId).then(res => {
      setSortedProducts(currentPage === 1 ? res : [...sortedProducts, ...res])
      getProducts(currentPage === 1 ? res : [...sortedProducts, ...res])

      setIsLoading(false)
    })
  }, [getKey, getValue, q, brandId, limit, currentPage])

  return (
    <div className={styles.wrapper}>
      <label htmlFor='sortBy'>
        <input type='text' />
        Sort By:
      </label>
      <select className={styles.select} onChange={handleChange} defaultValue='rating'>
        <option value='low'>Price: Low to High</option>
        <option value='high'>Price: High to Low</option>
        <option value='rating'>Rating</option>
      </select>
      {isLoading && !sortedProducts.length && <p>Loading...</p>}
    </div>
  )
}

export default SortBy
