import { HeaderAppProps } from '@/src/components'
import { FC, PropsWithChildren } from 'react'

export const LayoutAppProps: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-screen flex-col'>
			<HeaderAppProps />
			{children}
		</div>
	)
}
