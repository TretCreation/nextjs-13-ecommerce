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
	const [recommendProducts, setRecommendsProducts] = useState()

	useEffect(() => {
		async function fetchData() {
			const res = await ProductService.getRecommendation(product.id)
			//?
			if (!res) return
			//?
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setRecommendsProducts(res)
		}
		fetchData()
	}, [product.id])

	return (
		<div className={styles.main}>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div className={styles['img-block']}>
				<Image
					src={product.img}
					alt={product.name}
					width={350}
					height={0}
					className={styles.img}
				/>
			</div>
			<div className={styles.description}>
				<div>
					<h1 className={styles.product}>{product.name}</h1>
					<div className={styles.rating}>
						<Rating rating={product.rating} />
					</div>
					<p className='mb-1'>
						<a className={styles.text}>
							<b>Brand</b>:&nbsp;&nbsp;
						</a>
						{product.brand?.name}
					</p>
					<p className='mb-3'>
						<a className={styles.text}>
							<b>Category</b>:&nbsp;&nbsp;
						</a>
						{product.type?.name}
					</p>
				</div>
				<div>
					<p>Descriptions: </p>
					{product.product_info &&
						product.product_info.map(info => (
							<div className='flex flex-row' key={info.id}>
								<p>
									<b>{info.description}</b>:&nbsp;&nbsp;
								</p>
								<p>{info.title}</p>
							</div>
						))}
				</div>
				{recommendProducts ? (
					<div className={styles.recommendations}>
						<RecommendProduct recommendProducts={recommendProducts} />
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default ProductPage
