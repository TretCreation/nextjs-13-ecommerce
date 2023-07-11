import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Custom404: NextPage = () => (
  <div className='text-center'>
    <Head>
      <title>The page you were looking for doesn&apos;t exist | 404</title>
    </Head>
    <div className='text-center'>
      <Image src='/404.png' alt='404' width={500} height={0} />
    </div>
    <br />
    <p>Something is going wrong...</p>
  </div>
)

export default Custom404
