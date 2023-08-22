import { NextPage } from 'next'

import styles from './Header.module.scss'
import HeaderLogo from './logo/HeaderLogo'

const Header: NextPage = () => (
  <nav className={styles.nav}>
    <HeaderLogo />
  </nav>
)

export default Header
