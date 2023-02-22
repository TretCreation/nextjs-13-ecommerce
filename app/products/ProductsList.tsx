import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { IProducts } from '../../typing'

async function getProducts() {
	const res = await fetch(`${process.env.BASE_URL}/api/getProducts`)
	if (!res.ok) {
		console.log(res)
	}
	return res.json()
}

export default async function ProductsList() {
	const data = await getProducts()

	return (
		<div className='flex flex-row flex-wrap justify-between'>
			{data.map((product: IProducts) => (
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
