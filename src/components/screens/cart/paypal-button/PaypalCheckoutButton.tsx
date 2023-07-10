import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

import { useAppDispatch } from '@/src/components'
import { getCheckoutUrl } from '@/src/configs/url.config'
import { ICartPayment } from '@/src/interfaces/cart.interface'
import { AuthService } from '@/src/services/AuthService'
import { PaymentService } from '@/src/services/PaymentService'
import { clearCart, clearCartProducts } from '@/src/store/cart/cart.slice'

interface IPaypalCheckoutButtonProps {
	subtotal: number
	userId?: number
	email: string
	phone: number
	cartProducts: ICartPayment[]
}

const PaypalCheckoutButton: FC<IPaypalCheckoutButtonProps> = ({
	subtotal,
	userId,
	cartProducts,
	email,
	phone
}) => {
	const router = useRouter()

	const [error, setError] = useState<string | null>(null)

	function successPage(orderId: string) {
		router.push({ pathname: getCheckoutUrl('/success'), query: { orderId: orderId } })
	}

	const dispatch = useAppDispatch()
	const { status } = useSession()

	const handleApprove = async (order: any) => {
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

			await PaymentService.sendEmail(email, order?.status, subtotal, cartProducts)
			const resViber = await PaymentService.sendViber(phone, order?.id)
			if (!resViber) await PaymentService.sendSMS(phone, order?.id)

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

			await PaymentService.sendEmail(email, order?.status, subtotal, cartProducts)
			const resViber = await PaymentService.sendViber(phone, order?.id)
			if (!resViber) await PaymentService.sendSMS(phone, order?.id)

			if (status === 'authenticated') {
				dispatch(clearCartProducts(userId))
			}
		}
		successPage(order?.id)
	}

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
									value: String(subtotal),
									breakdown: {
										item_total: {
											currency_code: 'USD',
											value: String(subtotal)
										}
									}
								},
								items: cartProducts.map(product => ({
									name: product.name,
									unit_amount: {
										currency_code: 'USD',
										value: String(product.price)
									},
									quantity: String(product.count)
								})),
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
