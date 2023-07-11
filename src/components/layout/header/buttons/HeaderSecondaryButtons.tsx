import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/src/components'
import { getAdminUrl } from '@/src/configs/url.config'

import styles from './HeaderSecondaryButtons.module.scss'

const HeaderSecondaryButtons = () => {
  const { data: session } = useSession()

  return (
    <>
      {session?.user.role === 'ADMIN_ROLE' && (
        <Link href={getAdminUrl} className={styles.btn}>
          <Button appearance='solid'>Admin</Button>
        </Link>
      )}
    </>
  )
}

export default HeaderSecondaryButtons
