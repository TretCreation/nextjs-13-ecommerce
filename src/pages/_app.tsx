import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { Layout } from '../components/layout/Layout'
import { store } from '../store/store'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Head>
				<title>TretStore</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}
