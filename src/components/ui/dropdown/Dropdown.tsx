import cn from 'classnames'

import styles from './Dropdown.module.scss'
import { IDropdownProps } from './Dropdown.props'

const Dropdown = ({ children, appearance, className, ...props }: IDropdownProps): JSX.Element => {
  return (
    <button
      className={cn(className, {
        [styles.primary]: appearance === 'primary'
      })}
      {...props}
    >
      {children}
    </button>
  )
}

export default Dropdown
