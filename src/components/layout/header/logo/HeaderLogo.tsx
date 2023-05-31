import { logo } from '@/public'
import Image from 'next/image'
import Link from 'next/link'

const HeaderLogo = () => {
	return (
		<Link href='/'>
			<Image src={logo.src} alt='logo' width={160} height={100} priority />
		</Link>
	)
}

export default HeaderLogo
