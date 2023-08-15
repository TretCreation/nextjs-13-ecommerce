import { NextPage } from 'next'

import {
  HeaderDropdown,
  HeaderLogo,
  HeaderPrimaryButtons,
  HeaderSearchBar,
  HeaderSecondaryButtons
} from '@/src/components'

import styles from './PublicHeader.module.scss'

const PublicHeader: NextPage = () => (
  <nav className={styles.nav}>
    <div className={styles.primary}>
      <HeaderLogo />
      <HeaderSearchBar />
      <HeaderPrimaryButtons />
    </div>
    <div className='bg-blue-dark'>
      <div className={styles.secondary}>
        <HeaderDropdown />
        <HeaderSecondaryButtons />
      </div>
    </div>
  </nav>
)

export default PublicHeader
