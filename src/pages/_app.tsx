import '@/styles/globals.scss'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Layout } from '../components/layout/Layout'
import { LayoutAppProps } from '../components/layout/LayoutAppProps'
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
					{[`/checkout`, '/auth/sign-in', '/auth/sign-up'].includes(
						appProps.router.pathname
					) ? (
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
