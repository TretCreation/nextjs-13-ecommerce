import Image from 'next/image'
import Link from 'next/link'

import logoImage from '@/src/assets/images/logo.png'
import { getHomeUrl } from '@/src/configs/url.config'

const HeaderLogo = () => {
  return (
    <Link href={getHomeUrl}>
      <Image src={logoImage.src} alt='logo' width={160} height={100} priority />
    </Link>
  )
}

export default HeaderLogo
