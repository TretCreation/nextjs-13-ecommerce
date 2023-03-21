import { ProductService } from '@/src/services/ProductService'
import { IProduct } from '@/src/interfaces/product.interface'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Products.module.scss'

const CarPage: NextPage = () => {
	// //!DELETE
	// const [product, setProduct] = useState<IProduct>()

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		const data = await ProductService.getById()
	// 		setProduct(data)
	// 	}
	// 	fetchProducts()
	// }, [])

	return (
		<div className={styles.main}>
			<div className={styles.product}>
				{/* <Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
				/> */}
				Test
			</div>
			<div>Test</div>
		</div>
	)
}

export default CarPage
