import { Button, ProductItem, Rating } from '@/components'
import { ProductService } from '@/services/ProductService'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../typing'
import styles from './Product.module.scss'

export default function ProductList() {
	const [products, setProducts] = useState<IProduct[]>([])

	// //* Services
	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		const data = await ProductService.getAll()
	// 		setProducts(data)
	// 	}
	// 	fetchProducts()
	// }, [])

	//* Axios
	useEffect(() => {
		const fetchProducts = async () => {
			const res = await axios.get(`/api/getProducts`)

			setProducts(res.data)
		}
		fetchProducts()
	}, [])

	//* Fetch
	// useEffect(() => {
	// 	const getProducts = async () => {
	// 		const res = await fetch(`/api/getProducts`)
	// 		console.log(res)
	// 		if (!res.ok) {
	// 			console.log(res)
	// 		}
	// 		const data = await res.json()
	// 		setProducts(data)
	// 	}
	// 	getProducts()
	// }, [])

	//! not working
	return (
		<div className='flex flex-row flex-wrap justify-between'>
			{products.length ? (
				products.map((product: IProduct) => (
					<ProductItem key={product.id} product={product} />
				))
			) : (
				<p>There are no products :(</p>
			)}
		</div>
	)

	// return (
	// 	<div className='container mx-auto my-0'>
	// 		<h1 className={styles.h1}>BEST SELLERS</h1>
	// 		<div className='flex flex-row flex-wrap justify-between'>
	// 			{products.map((product: IProduct) => (
	// 				<div className={styles.card}>
	// 					<Link href={`products/${product.id}`}>
	// 						<Image
	// 							src={product.img}
	// 							alt={product.name}
	// 							width={200}
	// 							height={0}
	// 							className='rounded shadow'
	// 						/>
	// 					</Link>
	// 					<div className='flex flex-col items-center justify-center p-5'>
	// 						<Link href={`products/${product.id}`}>
	// 							<h2 className='text-lg'>{product.name}</h2>
	// 						</Link>
	// 						<p>${product.price}</p>
	// 						<Rating rating={4} />
	// 						<Button appearance='primary'>Add to cart</Button>
	// 					</div>
	// 				</div>
	// 			))}
	// 		</div>
	// 	</div>
	// )
}
