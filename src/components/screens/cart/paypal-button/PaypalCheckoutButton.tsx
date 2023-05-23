import { AuthService } from '@/src/services/AuthService'
import { PaymentService } from '@/src/services/PaymentService'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { FC, useState } from 'react'

interface IPaypalCheckoutButtonProps {
	subtotal: string
	userId?: number
	cartProducts: {
		id: number
		name: string
		price: number
	}[]
}

const PaypalCheckoutButton: FC<IPaypalCheckoutButtonProps> = ({
	subtotal,
	userId,
	cartProducts
}) => {
	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	//?
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
				style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'checkout' }}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									currency_code: 'USD',
									value: subtotal
								},
								//TODO Item
								// items: ,
								description: 'TretStore Order'
							}
						]
					})
				}}
				onApprove={async (data, actions) => {
					const order = await actions.order?.capture()

					if (!userId) {
						const password = Math.random().toString(36).slice(-8)

						const user = await AuthService.createUser(
							'Unauthorized user',
							password,
							null,
							null,
							null
						)
						await PaymentService.approvePayment(
							user.body.id,
							order?.status as string,
							order?.id as string,
							Number(subtotal),
							order?.create_time as string,
							order?.update_time as string
						)
						//TODO add to PaymentService: async addOrderProduct
						// await
					} else {
						await PaymentService.approvePayment(
							userId,
							order?.status as string,
							order?.id as string,
							Number(subtotal),
							order?.create_time as string,
							order?.update_time as string
						)
					}

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
