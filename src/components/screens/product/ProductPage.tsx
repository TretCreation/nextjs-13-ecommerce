import { IProductPage } from '@/src/interfaces/product.interface'
import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react'
import Rating from '../../ui/rating/Rating'
import styles from './ProductPage.module.scss'

export interface IProductPageProps {
	product: IProductPage
}

const ProductPage: FC<IProductPageProps> = ({ product }) => {
	console.log(product)
	return (
		<div className={styles.main}>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div>
				<Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
					className={styles.img}
				/>
			</div>
			<div className={styles.description}>
				<div>
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
				<div>
					{product.product_info &&
						product.product_info.map(info => (
							<div className='flex flex-row'>
								<p>{info.description}:</p>
								<p>{info.title}</p>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
