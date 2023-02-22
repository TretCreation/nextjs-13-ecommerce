import React from 'react'

interface PageProps {
	params: {
		productId: string
	}
}

const ProductPage = ({ params: { productId } }: PageProps) => {
	return <div>Product Page: {productId}</div>
}

export default ProductPage
