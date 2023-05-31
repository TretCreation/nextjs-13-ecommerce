import { IOrderHistory } from '@/src/interfaces/order.interface'
import Image from 'next/image'
import { FC } from 'react'
import styles from './OrderHistoryItem.module.scss'

const OrderHistoryItem: FC<{ order: IOrderHistory }> = ({ order }) => {
	return (
		<div className={styles.EDIT}>
			<p>Status: {order.status}</p>
			<p>Transaction ID: «{order.transactionId}»</p>
			<p>Amount of orders: ${order.paymentAmount}</p>
			<div className='border border-red-400'>
				{order.order_products.map((product, index) => (
					<div key={index} className='border border-emerald-400'>
						<p>Name: {product.product.name}</p>
						<Image
							src={product.product.img}
							alt={product.product.name}
							width={50}
							height={0}
						/>
						<p>Count: {product.count}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default OrderHistoryItem
