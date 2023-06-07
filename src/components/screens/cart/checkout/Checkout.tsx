import { Button, Input } from '@/src/components'
import { useAppSelector } from '@/src/components/hooks/useAppSelector'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import PaypalCheckoutButton from '../paypal-button/PaypalCheckoutButton'
import styles from './Checkout.module.scss'
// import { sendEmail } from './sendEmail'
import * as nodemailer from 'nodemailer'
import 'setimmediate'

const Checkout = () => {
	const { cartProducts } = useAppSelector(state => state.cart)
	const { data: session } = useSession()

	const [email, setEmail] = useState<string>('')

	const calculateSubtotal = (): number => {
		let subtotal = 0
		cartProducts.forEach(product => {
			subtotal += product.price * product.count
		})

		return subtotal
	}

	async function sendEmail(userEmail: string, status: string, subtotal: number) {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 465,
			secure: true,
			logger: true,
			debug: true,
			auth: {
				user: '',
				pass: ''
			},
			tls: {
				rejectUnauthorized: true
			}
		}) as nodemailer.Transporter

		const info = await transporter.sendMail({
			from: 'Tret Store <tret.store@gmail.com>',
			to: userEmail,
			subject: 'Your order',
			html: `
			<h1>Hello World</h1>
			<p>Status: ${status}</p>
			<p>Amount of orders: ${subtotal}</p>
		`
		})

		console.log('Message sent: ', info.messageId)
	}
	sendEmail('tret.creation@gmail.com', 'STATUS', 123)

	return (
		<div className={styles.EDIT}>
			<div>
				<p>Email address</p>
				<Input
					appearance='solid'
					placeholder='yourmail@mail.com'
					type='text'
					value={email}
					className='mb-1'
					onChange={e => setEmail(e.target.value)}
				/>
			</div>
			<Button
				appearance='primary'
				// onClick={() => sendEmail('tret.creation@gmail.com', 'Test', 123)}
			>
				Click
			</Button>
			<PaypalCheckoutButton
				subtotal={calculateSubtotal()}
				userId={session?.user.id}
				email={email}
				cartProducts={cartProducts.map(cartProduct => ({
					id: cartProduct.id,
					name: cartProduct.name,
					price: cartProduct.price,
					count: cartProduct.count
				}))}
			/>
		</div>
	)
}

export default Checkout
