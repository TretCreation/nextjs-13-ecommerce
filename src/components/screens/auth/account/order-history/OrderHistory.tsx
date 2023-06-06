import { OrderHistoryItem } from '@/src/components'
import { IOrderHistory } from '@/src/interfaces/order.interface'
import { OrderService } from '@/src/services/OrderService'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import styles from './OrderHistory.module.scss'

const OrderHistory = () => {
	const { data: session } = useSession()

	const [orders, setOrders] = useState<IOrderHistory[]>([])

	useEffect(() => {
		const fetchOrderHistory = async () => {
			const res = await OrderService.getSearchedProducts(session?.user.id)
			setOrders(res)
		}
		if (session?.user) fetchOrderHistory()
	}, [session?.user])

	return (
		<div className={styles.orders}>
			<h1>Order history</h1>
			{orders.length !== 0 ? (
				orders.map(order => <OrderHistoryItem key={order.id} order={order} />)
			) : (
				<div>You didn't purchase any product :(</div>
			)}
		</div>
	)
}

export default OrderHistory
