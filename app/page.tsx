import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import Products from './products/page'

const Home = () => {
	return (
		<>
			<Navbar />
			<Products />
			<Footer />
		</>
	)
}

export default Home
