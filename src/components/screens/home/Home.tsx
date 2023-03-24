import { ProductList } from '@/src/components'
import { IProductProps } from '@/src/interfaces/product.interface'
import { NextPage } from 'next'
import React from 'react'
import styles from './Home.module.scss'

const Home: NextPage<IProductProps> = ({ products }) => {
	return (
		<>
			<div className='container mx-auto my-0'>
				<h1 className={styles.h1}>BEST SELLERS</h1>
				<ProductList products={products} />
			</div>
		</>
	)
}

export default Home
