import WishlistItem from './wishlist-item/WishlistItem'
import styles from './Wishlist.module.scss'

const Wishlist = () => {
	return (
		<div className={styles.wishlist}>
			<div className={styles.info}>info</div>
			<div className={styles.products}>
				{products.map(product => (
					<WishlistItem product={product} />
				))}
			</div>
		</div>
	)
}

export default Wishlist
