import { FC } from 'react'
import styles from './PaymentSuccess.module.scss'

const PaymentSuccess: FC = () => {
	return (
		<div className={styles.success}>
			<p>
				Thanks for your order! We’re working hard to get it shipped to you. We hope to see
				you again in the future.
			</p>
		</div>
	)
}

export default PaymentSuccess
