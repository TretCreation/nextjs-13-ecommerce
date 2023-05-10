import { FC } from 'react'
import styles from './AuthError.module.scss'

interface ErrorMessages {
	[key: string]: string
}

const errors: ErrorMessages = {
	Signin: 'Try signing with a different account.',
	OAuthSignin: 'Try signing with a different account.',
	OAuthCallback: 'Try signing with a different account.',
	OAuthCreateAccount: 'Try signing with a different account.',
	EmailCreateAccount: 'Try signing with a different account.',
	Callback: 'Try signing with a different account.',
	OAuthAccountNotLinked:
		'To confirm your identity, sign in with the same account you used originally.',
	EmailSignin: 'Check your email address.',
	CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
	default: 'Unable to sign in.'
}

const AuthError: FC<{ error: string }> = ({ error }) => {
	const errorMessage = error && (errors[error] ?? errors.default)
	return <div className={styles.text}>{errorMessage}</div>
}

export default AuthError
