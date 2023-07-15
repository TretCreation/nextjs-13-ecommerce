import { FC } from 'react'

import { AuthError } from '@/src/components'

const ErrorPage: FC<{ error: string }> = ({ error }) => <AuthError error={error} />

export default ErrorPage
