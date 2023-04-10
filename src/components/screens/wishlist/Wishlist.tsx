import { useAppSelector } from '../../hooks/useAppSelector'
import WishlistItem from './wishlist-item/WishlistItem'
import styles from './Wishlist.module.scss'

const Wishlist = () => {
	const { wishlist } = useAppSelector(state => state)

	return (
		<div className={styles.wishlist}>
			<div className={styles.info}>info</div>
			<div className={styles.products}>
				{wishlist.wishProducts.map(wishProduct => (
					<WishlistItem wishProduct={wishProduct} />
				))}
			</div>
		</div>
	)
}

export default Wishlist
