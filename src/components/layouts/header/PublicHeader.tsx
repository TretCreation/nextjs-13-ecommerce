import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import AdminButton from './buttons/AdminButton'
import HeaderPrimaryButtons from './buttons/HeaderPrimaryButtons'
import HeaderDropdown from './dropdown/HeaderDropdown'
import HeaderLogo from './logo/HeaderLogo'
import styles from './PublicHeader.module.scss'
import HeaderSearchBar from './searchbar/HeaderSearchBar'

const PublicHeader: NextPage = () => {
  const { data: session } = useSession()

  return (
    <nav className={styles.nav}>
      <div className={styles.primary}>
        <HeaderLogo />
        <HeaderSearchBar />
        <HeaderPrimaryButtons />
      </div>
      <div className='bg-blue-dark'>
        <div className={styles.secondary}>
          <HeaderDropdown />
          {session?.user.role === 'ADMIN_ROLE' && <AdminButton />}
        </div>
      </div>
    </nav>
  )
}
export default PublicHeader
