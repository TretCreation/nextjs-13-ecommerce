import { NextPage } from 'next'

import { HeaderLogo } from '@/src/components'

import styles from './Header.module.scss'

const Header: NextPage = () => (
  <nav className={styles.nav}>
    <HeaderLogo />
  </nav>
)

export default Header
