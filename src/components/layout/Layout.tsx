import React, { FC, PropsWithChildren } from 'react'

import { Footer, Header } from '@/src/components'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
