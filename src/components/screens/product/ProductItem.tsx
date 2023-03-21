import Button from '@/src/components/ui/button/Button'
import Rating from '@/src/components/ui/rating/Rating'
import { IProduct } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Product.module.scss'

interface IProductItemProps {
	product: IProduct
}

const ProductItem: React.FC<IProductItemProps> = ({ product }) => {
	return (
		<div className={styles.card}>
			<Link href={`products/${product.id}`}>
				<Image
					src={product.img}
					alt={product.name}
					width={200}
					height={0}
					className='rounded shadow'
				/>
			</Link>
			<div className='flex flex-col items-center justify-center p-5'>
				<Link href={`products/${product.id}`}>
					<h2 className='text-lg'>{product.name}</h2>
				</Link>
				<p>${product.price}</p>
				<Rating rating={4} />
				<Button appearance='primary'>Add to cart</Button>
			</div>
		</div>
	)
}

export default ProductItem
