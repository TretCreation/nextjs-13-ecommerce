import { Modal } from '@/src/components'
import styles from './ModalAuth.module.scss'

const ModalAuth = () => {
	return (
		<Modal wrapperId='react-portal-modal'>
			<div className={styles.test}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Maiores perspiciatis labore tempore explicabo autem
					reprehenderit libero voluptas rem? Voluptatibus incidunt
					necessitatibus qui facere deleniti quam soluta corrupti
					magni! Voluptates, modi.
				</p>
			</div>
		</Modal>
	)
}

export default ModalAuth
