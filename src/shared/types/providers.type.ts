import { AppProps } from 'next/app'
import type { Session } from 'next-auth'

export interface Providers {
  children?: React.ReactNode
  session: Session
  // ?
  appProps: any
}
