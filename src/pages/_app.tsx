import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Layout } from '../components/layout/Layout'
import { persistor, store } from '../store/store'

export default function App({ Component, pageProps }: AppProps) {
	return (
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
	)
}
