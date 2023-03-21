import React, { FC, PropsWithChildren } from 'react'
import { Footer, Header } from '@/src/components'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
