import Link from 'next/link'
import { FC } from 'react'

import styles from './DropdownItem.module.scss'

interface IDropdownItemProps {
  text: string
  svg: any
  href: string
}

const DropdownItem: FC<IDropdownItemProps> = ({ text, svg, href }) => (
  <Link href={href} className={styles.item}>
    <div className={styles.svg}>{svg}</div>
    <p className={styles.text}>{text}</p>
  </Link>
)

export default DropdownItem
