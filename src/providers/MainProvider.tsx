import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { LayoutAppProps } from '../components/layouts/LayoutAppProps'
import { Layout } from '../components/layouts/PublicLayout'
import { getAuthUrl, getCheckoutHomeUrl, getCheckoutUrl } from '../configs/url.config'
import { Providers } from '../shared/types/providers.type'
import { persistor, store } from '../store/store'
import HeadProvider from './head-provider/HeadProvider'

const MainProvider: FC<Providers> = ({ children, session, appProps }) => (
  <HeadProvider>
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          {[
            getCheckoutHomeUrl,
            getCheckoutUrl('/success'),
            getAuthUrl('sign-in'),
            getAuthUrl('sign-up')
            // ?
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          ].includes(appProps.router.pathname) ? (
            <LayoutAppProps>{children}</LayoutAppProps>
          ) : (
            <Layout>{children}</Layout>
          )}
        </Provider>
      </PersistGate>
    </SessionProvider>
  </HeadProvider>
)

export default MainProvider
