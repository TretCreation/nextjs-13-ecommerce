import { FC, useEffect, useRef, useState } from 'react'

import { useEscape, useOutside } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'

import SearchBarItem from '../searchbar-item/SearchBarItem'
import styles from './SearchBarList.module.scss'

const SearchBarList: FC<{ searchedProducts: IProduct[] }> = ({ searchedProducts }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  // ?
  // useEffect(() => {
  //   console.log('@1', searchedProducts)
  // }, [searchedProducts])

  useEffect(() => {
    setIsOpen(searchedProducts.length > 0)
  }, [searchedProducts])

  //* Close modal on click outside
  useOutside(ref, handleClose, isOpen)

  // //* Close modal on escape
  useEscape(handleClose, isOpen)

  if (!isOpen) return null

  return (
    <div className={styles.list} ref={ref} onClick={handleClose}>
      {searchedProducts.map(searchedProduct => (
        <SearchBarItem key={searchedProduct.id} searchedProduct={searchedProduct} />
      ))}
    </div>
  )
}

export default SearchBarList
