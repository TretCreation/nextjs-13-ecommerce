import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { OrderHistoryItem } from '@/src/components'
import { IOrderHistory } from '@/src/interfaces/order.interface'
import { OrderService } from '@/src/services/order.service'
import { toastError } from '@/src/utils/api/handleToastError'

import styles from './OrderHistory.module.scss'

const OrderHistory = () => {
  const { data: session } = useSession()

  const [orders, setOrders] = useState<IOrderHistory[]>([])

  useEffect(() => {
    if (session?.user) {
      OrderService.getSearchedProducts(session?.user.id)
        .then(res => setOrders(res))
        .catch((error: Error) => toastError(error.message))
    }
  }, [session?.user])

  return (
    <div className={styles.orders}>
      <h1>Order history</h1>
      {orders.length !== 0 ? (
        orders.map(order => <OrderHistoryItem key={order.id} order={order} />)
      ) : (
        <div>You didn&apos;t purchase any product :(</div>
      )}
    </div>
  )
}

export default OrderHistory
