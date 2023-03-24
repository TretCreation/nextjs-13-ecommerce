import { IProductSingleProps } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import React, { FC } from 'react'
import styles from './Product.module.scss'

const ProductPage: FC<IProductSingleProps> = ({ product }) => {

	return (
		<div className={styles.main}>
			<div className={styles.img}>
				<Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
				/>
				Image
			</div>
			<div className={styles.description}>Description</div>
		</div>
	)
}

export default ProductPage
