import Button from '@/src/components/ui/button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Thanks.module.scss'

const Thanks: FC = () => {
	const urlParams = new URLSearchParams(window.location.search)
	const orderId = urlParams.get('orderId')

	if (orderId)
		return (
			<div className={styles.EDIT}>
				<p>
					Thanks for your order! We’re working hard to get it shipped to you. We hope to
					see you again in the future.
				</p>
				<Image
					src={'/assets/success-order.png'}
					alt='thanks'
					width={200}
					height={0}
					priority
				/>
				<p>Your Order: №{orderId}</p>
				<Button appearance='primary'>Telegram</Button>
				<Link href={{ pathname: '/checkout/success', query: orderId }}></Link>
			</div>
		)
	return <div>Something goes wrong...</div>
}

export default Thanks
