import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { Input } from '@/src/components'
import { useAppSelector } from '@/src/components/hooks/useAppSelector'

import PaypalCheckoutButton from '../paypal-button/PaypalCheckoutButton'
import styles from './Checkout.module.scss'

const Checkout = () => {
	const { cartProducts } = useAppSelector(state => state.cart)
	const { data: session } = useSession()

	const [fistName, setFirstName] = useState<string>('')
	const [secondName, setSecondName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [phone, setPhone] = useState<string>('+380')

	const calculateSubtotal = (): number => {
		let subtotal = 0
		cartProducts.forEach(product => {
			subtotal += product.price * product.count
		})

		return subtotal
	}

	return (
		<div className={styles.checkout}>
			<div>
				<p>First name</p>
				<Input
					appearance='solid'
					placeholder='James'
					type='text'
					value={fistName}
					className='mb-4'
					onChange={e => setFirstName(e.target.value)}
				/>
			</div>
			<div>
				<p>Last name</p>
				<Input
					appearance='solid'
					placeholder='Smith'
					type='text'
					value={secondName}
					className='mb-5'
					onChange={e => setSecondName(e.target.value)}
				/>
			</div>
			<div>
				<p>Email address</p>
				<Input
					appearance='solid'
					placeholder='yourmail@mail.com'
					type='text'
					value={email}
					className='mb-4'
					onChange={e => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<p>Phone number</p>
				<Input
					appearance='solid'
					placeholder='+380'
					type='text'
					value={phone}
					className='mb-5'
					onChange={e => setPhone(e.target.value)}
				/>
			</div>
			<PaypalCheckoutButton
				subtotal={calculateSubtotal()}
				userId={session?.user.id}
				email={email}
				phone={Number(phone.replace('+', ''))}
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
