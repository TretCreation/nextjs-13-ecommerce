import cn from 'classnames'

import styles from './Button.module.scss'
import { IButtonProps } from './Button.props'

const Button = ({ appearance, children, className, ...props }: IButtonProps): JSX.Element => {
  return (
    <button
      className={cn(className, {
        [styles.primary]: appearance === 'primary',
        [styles.solid]: appearance === 'solid',
        [styles.svg]: appearance === 'svg'
      })}
      {...props}
    >
      {children}
    </button>
  )
}
export default Button
