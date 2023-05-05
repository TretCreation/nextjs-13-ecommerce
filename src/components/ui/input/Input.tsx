import cn from 'classnames'
import styles from './Input.module.scss'
import { IInputProps } from './Input.props'

const Input = ({ appearance, className, ...props }: IInputProps): JSX.Element => {
	return (
		<input
			className={cn(className, {
				[styles.primary]: appearance === 'primary',
				[styles.solid]: appearance === 'solid'
			})}
			{...props}
		/>
	)
}
export default Input
