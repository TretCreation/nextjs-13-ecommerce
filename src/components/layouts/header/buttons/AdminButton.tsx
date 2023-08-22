import Link from 'next/link'

import { Button } from '@/src/components'
import { getAdminUrl } from '@/src/configs/url.config'

import styles from './AdminButton.module.scss'

const AdminButton = () => (
  <Link href={getAdminUrl} className={styles.btn}>
    <Button appearance='solid'>Admin</Button>
  </Link>
)

export default AdminButton
