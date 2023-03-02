import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IProducts } from '../../typing'

export default function ProductsList() {
	const [products, setProducts] = useState({ elem: [] })

	useEffect(() => {
		async function getProducts() {
			const res = await fetch(`${process.env.BASE_URL}/api/getProducts`)
			if (!res.ok) {
				console.log(res)
			}
			const data = await res.json()
			setProducts(data)
		}
		getProducts()
	}, [])

	return (
		<div className='flex flex-row flex-wrap justify-between'>
			{products.elem.map((product: IProducts) => (
				<div className='card'>
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
						<button className='primary-button' type='button'>
							Add to cart
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
