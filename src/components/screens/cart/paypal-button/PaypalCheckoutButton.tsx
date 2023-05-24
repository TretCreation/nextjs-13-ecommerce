import { useAppDispatch } from '@/src/components'
import { AuthService } from '@/src/services/AuthService'
import { PaymentService } from '@/src/services/PaymentService'
import { clearCart, clearCartProducts } from '@/src/store/cart/cart.slice'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

interface IPaypalCheckoutButtonProps {
	subtotal: number
	userId?: number
	cartProducts: {
		id: number
		name: string
		price: number
		count: number
	}[]
}

const PaypalCheckoutButton: FC<IPaypalCheckoutButtonProps> = ({
	subtotal,
	userId,
	cartProducts
}) => {
	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const dispatch = useAppDispatch()
	const { status } = useSession()

	const handleApprove = async (order: any) => {
		setPaidFor(true)
		if (!userId) {
			const password = Math.random().toString(36).slice(-8)
			const user = await AuthService.createUser(
				'Unauthorized user',
				password,
				null,
				null,
				null
			)
			const paymentData = await PaymentService.approvePayment(
				user.body.id,
				order?.status as string,
				order?.id as string,
				subtotal,
				order?.create_time as string,
				order?.update_time as string
			)
			cartProducts.map(async product => {
				await PaymentService.addOrderProduct(paymentData, product.id, product.count)
			})
			dispatch(clearCart())
		} else {
			const paymentData = await PaymentService.approvePayment(
				userId,
				order?.status as string,
				order?.id as string,
				subtotal,
				order?.create_time as string,
				order?.update_time as string
			)
			cartProducts.map(async product => {
				await PaymentService.addOrderProduct(paymentData, product.id, product.count)
			})
			if (status === 'authenticated') {
				dispatch(clearCartProducts(userId))
			}
		}
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
				key={cartProducts.length}
				forceReRender={cartProducts}
				createOrder={(data, actions) => {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									currency_code: 'USD',
									value: String(subtotal)
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

					console.log('order', order)

					handleApprove(order)
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
