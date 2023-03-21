import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>TretStore</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}
