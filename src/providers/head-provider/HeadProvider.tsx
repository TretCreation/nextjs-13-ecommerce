import Head from 'next/head'
import { FC } from 'react'

const HeadProvider: FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Head>
      <title>TretStore</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    {children}
  </>
)

export default HeadProvider
