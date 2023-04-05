import { WishlistIcon } from '@/public'
import Button from '@/src/components/ui/button/Button'
import Rating from '@/src/components/ui/rating/Rating'
import { IProductSingleProps } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './ProductItem.module.scss'

const ProductItem: React.FC<IProductSingleProps> = ({ product }) => {
	return (
		<div className={styles.card}>
			<Link href={`products/${product.id}`}>
				<Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
				/>
			</Link>
			<div className={styles.info}>
				<Link href={`products/${product.id}`}>
					<h2 className={styles.title}>{product.name}</h2>
				</Link>
				<WishlistIcon className='fill-primary-main' />
				<p>${product.price}</p>
				<Rating rating={product.rating} />
				<Button appearance='primary' className={styles.btn}>
					Add to cart
				</Button>
			</div>
		</div>
	)
}

export default ProductItem
