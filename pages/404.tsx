import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Custom404: NextPage /* FC */ = () => (
	<>
		<Head>
			<title>
				The page you were looking for doesn&apos;t exist | 404
			</title>
		</Head>
		<div>404</div>
		<div>Something is going wrong...</div>
	</>
);

export default Custom404;
