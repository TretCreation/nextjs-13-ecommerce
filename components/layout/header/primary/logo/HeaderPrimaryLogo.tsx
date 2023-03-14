import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../../../../public/logo.png'

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
