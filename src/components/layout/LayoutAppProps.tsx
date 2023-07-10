import { FC, PropsWithChildren } from 'react'

import { HeaderAppProps } from '@/src/components'

export const LayoutAppProps: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-screen flex-col'>
			<HeaderAppProps />
			{children}
		</div>
	)
}
