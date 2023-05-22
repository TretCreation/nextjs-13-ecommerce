import { NoProductsPng } from '@/public'
import { NextPage } from 'next'
import Image from 'next/image'
import styles from './NoProducts.module.scss'

const NoProducts: NextPage = () => {
	return (
		<div className={styles.wrapper}>
			<Image src={NoProductsPng.src} alt={'Cart is empty'} width={400} height={200} />
			<p className={styles.text}>Cart is empty</p>
		</div>
	)
}

export default NoProducts
