import { HeaderPrimary, HeaderSecondary } from '@/components'
import { NextPage } from 'next'

const Header: NextPage = () => (
	<nav>
		<HeaderPrimary />
		<HeaderSecondary />
	</nav>
)

export default Header
