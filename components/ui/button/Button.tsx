import cn from 'classnames'
import styles from './Button.module.scss'
import { ButtonProps } from './Button.props'

const Button = ({
	appearance,
	children,
	className,
	...props
}: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(className, {
				[styles['btn-primary']]: appearance === 'primary',
				[styles['btn-primary-solid']]: appearance === 'primary-solid'
			})}
			{...props}
		>
			{children}
		</button>
	)
}
export default Button
