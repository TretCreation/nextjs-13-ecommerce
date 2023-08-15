import '@/src/assets/styles/globals.scss'

import { AppProps } from 'next/app'
import type { Session } from 'next-auth'

import MainProvider from '../providers/MainProvider'

const App = ({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps<{ session: Session }>) => (
  <MainProvider session={session} appProps={appProps}>
    <Component {...pageProps} />
  </MainProvider>
)

export default App
