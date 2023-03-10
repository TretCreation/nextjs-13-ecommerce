import { Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IProducts } from '../../../typing'
import styles from './ProductList.module.scss'

export default function ProductsList() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		async function getProducts() {
			const res = await fetch(`/api/getProducts`)
			if (!res.ok) {
				console.log(res)
			}
			const data = await res.json()
			setProducts(data)
		}
		getProducts()
	}, [])

	return (
		<div className='container mx-auto my-0'>
			<h1 className={styles.h1}>BEST SELLERS</h1>
			<div className='flex flex-row flex-wrap justify-between'>
				{products.map((product: IProducts) => (
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
							<Button appearance='primary'>Add to cart</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
