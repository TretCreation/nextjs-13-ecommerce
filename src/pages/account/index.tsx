import type { GetServerSidePropsContext, NextPage } from 'next'
import { getServerSession } from 'next-auth'

import { Account } from '@/src/components'
import { getAuthUrl } from '@/src/configs/url.config'

import { authOptions } from '../api/auth/[...nextauth]'

const AuthPage: NextPage = () => {
  return <Account />
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || null) {
    return {
      redirect: {
        destination: getAuthUrl('sign-in')
      }
    }
  }
  return {
    props: JSON.parse(JSON.stringify(session))
  }
}

export default AuthPage
