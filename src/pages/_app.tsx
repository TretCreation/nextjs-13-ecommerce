import '@/styles/globals.scss'

import { AppProps } from 'next/app'
import Head from 'next/head'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { Layout } from '../components/layout/Layout'
import { LayoutAppProps } from '../components/layout/LayoutAppProps'
import { getAuthUrl, getCheckoutHomeUrl, getCheckoutUrl } from '../configs/url.config'
import { persistor, store } from '../store/store'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Head>
            <title>TretStore</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          {[
            getCheckoutHomeUrl,
            getCheckoutUrl('/success'),
            getAuthUrl('sign-in'),
            getAuthUrl('sign-up')
          ].includes(appProps.router.pathname) ? (
            <LayoutAppProps>
              <Component {...pageProps} />
            </LayoutAppProps>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </PersistGate>
    </SessionProvider>
  )
}
