import { IProduct } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './SearchBarItem.module.scss'

interface ISearchBarItemProps {
	searchedProduct: IProduct
}

const SearchBarItem: FC<ISearchBarItemProps> = ({ searchedProduct }) => {
	return (
		<Link href={`product/${searchedProduct.id}`} className={styles.item}>
			<Image
				src={searchedProduct.img}
				alt={searchedProduct.name}
				width={50}
				height={25}
				priority
			/>
			<p className={styles.name}>{searchedProduct.name}</p>
			<p className={styles.price}>{searchedProduct.price}</p>
		</Link>
	)
}

export default SearchBarItem
