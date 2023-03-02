import styles from './Button.module.scss'
import { ButtonProps } from './Button.props'

const Button = ({ appearance, children }: ButtonProps): JSX.Element => {
	return <button className={styles['btn-primary']}>{children}</button>
}
export default Button
