import { IProductPage } from '@/src/interfaces/product.interface'
import { ProductService } from '@/src/services/ProductService'
import Head from 'next/head'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import Rating from '../../ui/rating/Rating'
import styles from './ProductPage.module.scss'
import RecommendProduct from './recommend-product/RecommendProduct'

export interface IProductPageProps {
	product: IProductPage
}

const ProductPage: FC<IProductPageProps> = ({ product }) => {
	const [recommendProduct, setRecommendsProduct] = useState()
	console.log(product)

	useEffect(() => {
		async function fetchData() {
			const res = await ProductService.getRecommendation(product.id)
			//?
			if (!res) return
			setRecommendsProduct(res)
		}
		fetchData()
	}, [product.id])

	console.log('recommendProduct', recommendProduct)

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
							<div className='flex flex-row' key={info.id}>
								<p>{info.description}:</p>
								<p>{info.title}</p>
							</div>
						))}
				</div>
				<div className={styles.recommendations}>
					{recommendProduct ? (
						<>
							<p className='border-t-3 border'>What buys with:</p>
							<RecommendProduct recommendProduct={recommendProduct} />
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
