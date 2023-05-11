import Button from '@/src/components/ui/button/Button'
import styles from './Admin.module.scss'

const Admin = () => {
	return (
		<div className={styles.wrapper}>
			<Button appearance='primary' className={styles.btn}>
				Add / Remove a product
			</Button>
			<Button appearance='primary' className={styles.btn}>
				Add / Remove a brand
			</Button>
			<Button appearance='primary' className={styles.btn}>
				Add / Remove a type
			</Button>
		</div>
	)
}

export default Admin
