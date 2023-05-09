import { FacebookIcon, GoogleIcon } from '@/public'
import Button from '@/src/components/ui/button/Button'
import Input from '@/src/components/ui/input/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './SignIn.module.scss'

// interface ISignInProps {
// 	any: any
// }

const SignIn: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	//?
	const [status, setStatus] = useState<number>()

	const onSubmit = async () => {
		const res = await signIn('credentials', {
			email: email,
			password: password,
			redirect: false,
			callbackUrl: '/'
		})
		if (res?.status) {
			setStatus(res?.status)
		}
	}

	return (
		<div className={styles.menu}>
			<div className={styles.h1}>
				<h1>LOGIN</h1>
				<p>Welcome back customer</p>
			</div>
			<div className={styles.input}>
				{status === 401 ? (
					<p className='text-primary-main'>
						The email or password you’ve entered is incorrect
					</p>
				) : (
					<></>
				)}
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
				<div className='flex flex-row'>
					<Input type='checkbox' />
					<p>Remember me</p>
					<p className='mr-10 text-primary-main'>Forgot password</p>
				</div>
				<Button appearance='primary' className='mb-4' onClick={onSubmit}>
					LOGIN
				</Button>
				<p className='mb-2'>OR LOGIN WITH</p>
				<div className='flex flex-row'>
					<Button
						appearance='primary'
						className='mr-2 mb-3 flex flex-row bg-blue-500'
						onClick={() => signIn('facebook', { callbackUrl: '/' })}
					>
						<p>FACEBOOK</p>
						<FacebookIcon />
					</Button>
					<Button
						appearance='primary'
						onClick={() => signIn('google', { callbackUrl: '/' })}
						className='flex flex-row'
					>
						<p>GOOGLE</p>
						<GoogleIcon />
					</Button>
				</div>
				<div className='flex flex-row'>
					<p>Don't have account?</p>
					<Link href='/auth/sign-up'>
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
