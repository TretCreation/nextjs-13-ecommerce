import '@/styles/globals.scss'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Layout } from '../components/layout/Layout'
import { persistor, store } from '../store/store'

const { PAYPAL_CLIENT_ID = '' } = process.env

export default function App({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session} refetchInterval={5 * 60}>
			<PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
				<PersistGate loading={null} persistor={persistor}>
					<Provider store={store}>
						<Head>
							<title>TretStore</title>
							<link rel='icon' href='/favicon.ico' />
						</Head>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Provider>
				</PersistGate>
			</PayPalScriptProvider>
		</SessionProvider>
	)
}
