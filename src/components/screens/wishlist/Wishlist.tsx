import { FC } from 'react'
import styles from './Wishlist.module.scss'

interface IWishlistProps {
	delete?: string
}

const Wishlist: FC<IWishlistProps> = () => {
	return <div className={styles.wishlist}>Wishlist</div>
}

export default Wishlist
