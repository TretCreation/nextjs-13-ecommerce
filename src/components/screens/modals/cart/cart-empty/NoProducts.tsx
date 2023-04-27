import { NoCartProduct } from '@/public'
import { NextPage } from 'next'
import Image from 'next/image'
import styles from './NoProducts.module.scss'

const NoProducts: NextPage = () => {
	return (
		<div className={styles.wrapper}>
			<Image
				src={NoCartProduct.src}
				alt={'Cart is empty'}
				width={200}
				height={100}
			/>
			Cart is empty
		</div>
	)
}

export default NoProducts
