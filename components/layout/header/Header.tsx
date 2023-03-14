import { HeaderPrimary, HeaderSecondary } from '@/components'
import { NextPage } from 'next'
import React from 'react'

const Header: NextPage = () => (
	<nav>
		<HeaderPrimary />
		<HeaderSecondary />
	</nav>
)

export default Header
