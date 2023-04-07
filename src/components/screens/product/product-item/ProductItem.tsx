import { WishlistIcon } from '@/public'
import {
	Button,
	Rating,
	useAppDispatch,
	useAppSelector
} from '@/src/components'
import { IProductSingleProps } from '@/src/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './ProductItem.module.scss'

const ProductItem: FC<IProductSingleProps> = ({ product }) => {
	const dispatch = useAppDispatch()
	const { products } = useAppSelector(state => state.wishlistReducer)

	console.log(products)
	return (
		<div className={styles.card}>
			<Link href={`products/${product.id}`} className={styles.img}>
				<Image
					src={product.img}
					alt={product.name}
					width={400}
					height={0}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<Link href={`products/${product.id}`}>
					<h2 className={styles.title}>{product.name}</h2>
				</Link>
				<Button appearance='svg'>
					<WishlistIcon
						className='fill-primary-main'
						onClick={() => dispatch(products)}
					/>
				</Button>
				<p>${product.price}</p>
				<Rating rating={product.rating} />
				<Button appearance='primary' className={styles.btn}>
					Add to cart
				</Button>
			</div>
		</div>
	)
}

export default ProductItem
