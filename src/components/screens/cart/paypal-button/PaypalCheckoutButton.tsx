import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { FC, useState } from 'react'

interface IPaypalCheckoutButtonProps {
	subtotal: string
}

const PaypalCheckoutButton: FC<IPaypalCheckoutButtonProps> = ({ subtotal }) => {
	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleApprove = (orderId: any) => {
		setPaidFor(true)
	}

	if (paidFor) alert('Thank you for you purchase')

	if (error) alert(error)

	return (
		<PayPalScriptProvider
			options={{
				'client-id': process.env.PAYPAL_CLIENT_ID as string,
				currency: 'USD'
			}}
		>
			<PayPalButtons
				style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									currency_code: 'USD',
									// value: String(product.price)
									value: subtotal
								}
								// description: product.name
							}
						]
					})
				}}
				onApprove={async (data, actions) => {
					const order = await actions.order?.capture()
					console.log('order', order)

					handleApprove(data.orderID)
				}}
				onError={(err: any) => {
					setError(err)
					console.log('PayPal Checkout onError', err)
				}}
			/>
		</PayPalScriptProvider>
	)
}

export default PaypalCheckoutButton
