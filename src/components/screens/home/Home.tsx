import { Footer, Header, ProductList } from '@/src/components'
import React from 'react'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<>
			<div className='container mx-auto my-0'>
				<h1 className={styles.h1}>BEST SELLERS</h1>
				<ProductList />
			</div>
		</>
	)
}

export default Home
