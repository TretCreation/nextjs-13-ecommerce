import { IProductSingleProps } from '@/src/interfaces/product.interface'
import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'
import Rating from '../../ui/rating/Rating'
import styles from './ProductPage.module.scss'

const ProductPage: FC<IProductSingleProps> = ({ product }) => {
	return (
		<div className={styles.main}>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div className={styles.img}>
				<Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
				/>
			</div>
			<div className={styles.description}>
				<h1 className='text-2xl'>{product.name}</h1>
				<Rating rating={product.rating} />
				<p>
					<a className={styles.a}>Availability:</a>
				</p>
				<p>
					<a className={styles.a}>Brand:</a>
					{product.brand?.name}
				</p>
				<p>
					<a className={styles.a}>Category:</a>
					{product.type?.name}
				</p>
			</div>
		</div>
	)
}

export default ProductPage
