import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FC, useState } from 'react'

import { FacebookIcon, GoogleIcon } from '@/public'
import Button from '@/src/components/ui/button/Button'
import Input from '@/src/components/ui/input/Input'
import { getAuthUrl } from '@/src/configs/url.config'

import AuthError from '../error/AuthError'
import styles from './SignIn.module.scss'

const SignIn: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { error } = useRouter().query as { error: string }

	const onSubmit = async () => {
		signIn('credentials', {
			email: email,
			password: password,
			redirect: true,
			callbackUrl: '/'
		})
	}

	return (
		<div className={styles.menu}>
			<div className={styles.h1}>
				<h1 className={styles.title}>
					<b>LOGIN</b>
				</h1>
				<p>Welcome back customer</p>
			</div>
			<div className={styles.input}>
				<AuthError error={error} />
				<p>Email address</p>
				<Input
					appearance='solid'
					placeholder='yourmail@mail.com'
					type='text'
					value={email}
					className='mb-1'
					onChange={e => setEmail(e.target.value)}
				/>
				<p>Password</p>
				<Input
					appearance='solid'
					placeholder='*******'
					type='password'
					value={password}
					className='mb-1'
					onChange={e => setPassword(e.target.value)}
				/>

				<Button appearance='primary' className={styles.btnlog} onClick={onSubmit}>
					LOGIN
				</Button>
				<p className='mb-2'>OR LOGIN WITH</p>
				<div className='flex flex-row'>
					<Button
						appearance='primary'
						className={styles.btnfacebook}
						onClick={() => signIn('facebook', { callbackUrl: '/' })}
					>
						<p>FACEBOOK</p>
						<FacebookIcon />
					</Button>
					<Button
						appearance='primary'
						onClick={() => signIn('google', { callbackUrl: '/' })}
						className={styles.btngoogle}
					>
						<p>GOOGLE</p>
						<GoogleIcon />
					</Button>
				</div>
				<div className='flex flex-row'>
					<p>Don't have account?</p>
					<Link href={getAuthUrl('sign-up')} className={styles.link}>
						<Button
							appearance='svg'
							className='text-primary-main'
							// onClick={() => signIn()}
						>
							Register now
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignIn
