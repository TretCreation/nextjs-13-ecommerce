import { ProductService } from '@/src/services/ProductService'
import { IProduct, IProductItemProps } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import React, { useEffect, useState, FC } from 'react'
import styles from './Product.module.scss'

const ProductPage: FC<IProductItemProps> = ({ product }) => {
	console.log(product)

	// //!DELETE
	// const [product, setProduct] = useState<IProduct>()

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		const data = await ProductService.getById()
	// 		console.log(data)
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
				Image
			</div>
			<div></div>
		</div>
	)
}

export default ProductPage
