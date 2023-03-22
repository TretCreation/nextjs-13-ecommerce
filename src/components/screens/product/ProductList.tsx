import { ProductItem } from '@/src/components'
import { ProductService } from '@/src/services/ProductService'
import axios from 'axios'
import { GetStaticProps, NextPage } from 'next'
import React, { useEffect, useState, FC } from 'react'
import { IProduct, IProductProps } from '../../../interfaces/product.interface'

const ProductList: NextPage<IProductProps> = ({ products }) => {
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
}

export default ProductList
