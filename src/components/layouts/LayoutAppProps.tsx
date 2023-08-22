import { FC, PropsWithChildren } from 'react'

import { Header } from '@/src/components'

// ? [LayoutAppProps] Maybe rename?
export const LayoutAppProps: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex h-screen flex-col'>
    <Header />
    {children}
  </div>
)
