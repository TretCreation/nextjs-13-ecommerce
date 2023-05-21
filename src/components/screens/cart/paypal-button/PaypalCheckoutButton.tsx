import { IProduct } from '@/src/interfaces/product.interface'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { FC, useState } from 'react'
// import styles from './PaypalCheckoutButton.module.scss'

interface IPaypalCheckoutButtonProps {
	props: {
		product: IProduct
	}
}

const PaypalCheckoutButton: FC<IPaypalCheckoutButtonProps> = ({ props }) => {
	const [paidFor, setPaidFor] = useState<boolean>(false)

	const { product } = props

	const handleApprove = (orderId: any) => {
		setPaidFor(true)
	}

	if(paidFor) alert("Thank you for you purchase")

	return (
		<div className={styles.btn}>
			<PayPalButtons
				style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									currency_code: 'USD',
									value: String(product.price)
								},
								description: product.name
							}
						]
					})
				}}
				onApprove={async (data, actions) => {
					const order = await actions.order?.capture()
					console.log('order', order)

					handleApprove(data.orderID)
				}}
			/>
		</div>
	)
}

export default PaypalCheckoutButton
