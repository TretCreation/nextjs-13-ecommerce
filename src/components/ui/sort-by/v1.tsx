import { ChangeEvent, FC, useEffect, useState } from 'react'

import { sortKey, sortValue, typeId } from '@/src/interfaces/api.type'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'

import styles from './SortBy.module.scss'

interface ISortBy {
  limit: number
  q: typeId
  currentPage: number
  brandId: number | undefined
  getProducts: (products: IProduct[]) => void
  setCurrentPage: (currentPage: number) => void
}

const SortBy: FC<ISortBy> = ({ limit, q, getProducts, setCurrentPage, currentPage, brandId }) => {
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])
  const [getKey, setGetKey] = useState<sortKey>('r')
  const [getValue, setGetValue] = useState<sortValue>('desc')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async (selectEvent: ChangeEvent<HTMLSelectElement>) => {
    const options: { [key: string]: [sortKey, sortValue] } = {
      low: ['p', 'asc'],
      high: ['p', 'desc'],
      rating: ['r', 'desc']
    }
    const [k, v] = options[selectEvent.target.value]
    filterProducts(k, v)
  }

  const filterProducts = async (key: sortKey, value: sortValue) => {
    setSortedProducts([])
    setGetKey(key)
    setGetValue(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    console.log('sortedProducts: useEffect', sortedProducts)
  }, [brandId, sortedProducts])

  useEffect(() => {
    const handleInput = async () => {
      setIsLoading(true)

      if (brandId) {
        setIsLoading(true)
        const res = await SortByService.getSortedProducts(
          getKey,
          getValue,
          q,
          limit,
          currentPage,
          brandId
        )
        setIsLoading(false)
        setSortedProducts(res)
        getProducts(res)
      } else {
        setSortedProducts([])
        const res = await SortByService.getSortedProducts(
          getKey,
          getValue,
          q,
          limit,
          currentPage,
          brandId
        )
        const updatedProducts = brandId ? res : [...sortedProducts, ...res]

        // const updatedProducts = [...sortedProducts, ...res]

        console.log('res', res)
        console.log('sortedProducts', sortedProducts)
        console.log('updatedProducts', updatedProducts)

        setIsLoading(false)
        setSortedProducts(updatedProducts) // Add new response to the current state
        getProducts(updatedProducts)
      }
    }

    handleInput()
  }, [getKey, getValue, q, brandId, limit, currentPage])

  return (
    <div className={styles.wrapper}>
      <label htmlFor='sortBy'>Sort By:</label>
      <select className={styles.select} onChange={handleChange} defaultValue='rating'>
        <option value='low'>Price: Low to High</option>
        <option value='high'>Price: High to Low</option>
        <option value='rating'>Rating</option>
      </select>
      {isLoading && sortedProducts.length === 0 && <p>Loading...</p>}
    </div>
  )
}

export default SortBy
