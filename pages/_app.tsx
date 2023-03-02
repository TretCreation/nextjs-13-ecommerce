import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>TretStore</title>
				<link rel='icon' href='/icon.ico' />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
