import Image from 'next/image'
import Link from 'next/link'

import logoImage from '@/src/assets/images/logo.png'
import { getHomeUrl } from '@/src/configs/url.config'

const HeaderLogo = () => (
  <Link href={getHomeUrl}>
    <Image src={logoImage} alt='logo' priority />
  </Link>
)

export default HeaderLogo
