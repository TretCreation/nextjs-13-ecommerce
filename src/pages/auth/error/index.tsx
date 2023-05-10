import { AuthError } from '@/src/components'
import { FC } from 'react'

const ErrorPage: FC<{ error: string }> = ({ error }) => {
	return <AuthError error={error} />
}

export default ErrorPage
