import { FC, PropsWithChildren } from 'react'

import { Footer, PublicHeader } from '@/src/components'

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex flex-col h-screen'>
    <PublicHeader />
    {children}
    <Footer />
  </div>
)
