import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { DiagonalArrowLeftIcon } from '@/src/assets'
import { getProductUrl } from '@/src/configs/url.config'
import { IProduct } from '@/src/interfaces/product.interface'

import styles from './SearchBarItem.module.scss'

interface ISearchBarItemProps {
  searchedProduct: IProduct
}

const SearchBarItem: FC<ISearchBarItemProps> = ({ searchedProduct }) => {
  return (
    <div className={styles.item}>
      <Link href={getProductUrl(`${searchedProduct.id}`)} className={styles.link}>
        <Image
          src={searchedProduct.img}
          alt={searchedProduct.name}
          width={50}
          height={25}
          priority
          className={styles.img}
        />
        <p className={styles.text}>{searchedProduct.name}</p>
        <p className={styles.price}>${searchedProduct.price}</p>
        <DiagonalArrowLeftIcon className={styles.svg} />
      </Link>
    </div>
  )
}

export default SearchBarItem
