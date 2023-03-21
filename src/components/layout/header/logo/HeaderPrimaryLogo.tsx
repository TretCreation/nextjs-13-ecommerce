import { logo } from '@/public'
import Image from 'next/image'
import Link from 'next/link'

const HeaderPrimaryLogo = () => {
	return (
		<Link href='#'>
			<Image
				src={logo.src}
				alt='logo'
				className=''
				width={160}
				height={100}
			/>
		</Link>
	)
}

export default HeaderPrimaryLogo
