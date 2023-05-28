import { IProduct } from '@/src/interfaces/product.interface'
import { FC } from 'react'

const RecommendProduct: FC<{ recommendProduct: IProduct }> = ({ recommendProduct }) => {
	return (
		<div className='border border-t'>
			<div>{recommendProduct.name}</div>
			<div>{recommendProduct.price}</div>
			<div>{recommendProduct.rating}</div>
		</div>
	)
}

export default RecommendProduct
