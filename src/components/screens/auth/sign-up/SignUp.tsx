import { FacebookIcon, GoogleIcon, ShowPasswordIcon } from '@/public'
import Button from '@/src/components/ui/button/Button'
import Input from '@/src/components/ui/input/Input'
import { AuthService } from '@/src/services/AuthService'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import styles from './SignUp.module.scss'

const SignUp: FC = () => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
	const [error, setError] = useState<string>()

	const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

	const onSubmit = async () => {
		if (regEx.test(email)) {
			if (password === confirmPassword) {
				const res = await AuthService.createUser(name, password, email)
				if (res.errorMessage) {
					setError(res.errorMessage)
				}
				res
				signIn('credentials', {
					email: email,
					password: password,
					redirect: res.hasError ? false : true,
					callbackUrl: '/'
				})
			} else {
				setError('passwords didn’t match')
			}
		} else if (!regEx.test(email) && email !== '') {
			setError('email is not valid')
		}
	}

	return (
		<div className={styles.menu}>
			<div className={styles.h1}>
				<h1 className={styles.title}>
					<b>CREATE AN ACCOUNT</b>
				</h1>
				<p>Register for new costumer</p>
			</div>
			<div className={styles.input}>
				<div className='full-name'>
					{error === 'name required' && (
						<p className='text-primary-main'>Name required</p>
					)}
					<p>Full Name</p>
					<Input
						appearance='solid'
						placeholder='Your name'
						type='text'
						className='mb-1'
						onChange={e => setName(e.target.value)}
						value={name}
					/>
				</div>

				<div className='email'>
					{error === 'email required' && (
						<p className='text-primary-main'>Email required</p>
					)}
					{error === 'P2002' && (
						<p className='text-primary-main'>The character already exists</p>
					)}
					{error === 'email is not valid' && (
						<p className='text-primary-main'>Email is Not Valid</p>
					)}
					<p>Email address</p>
					<Input
						appearance='solid'
						placeholder='yourmail@mail.com'
						type='email'
						className='mb-1'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className={styles.password}>
					{error === 'password required' && (
						<p className='text-primary-main'>Password required</p>
					)}
					{error === 'passwords didn’t match' && (
						<p className='text-primary-main'>
							Those passwords didn’t match. Try again.
						</p>
					)}
					<p>Password</p>
					<Input
						appearance='solid'
						placeholder='*******'
						type={showPassword ? 'text' : 'password'}
						className='mb-0'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
					<Button
						appearance='svg'
						onClick={() => setShowPassword(!showPassword)}
						className={styles.buttonpass}
					>
						<ShowPasswordIcon className='h-9 w-9' />
					</Button>
					<p>Confirm Password</p>
					<Input
						appearance='solid'
						placeholder='*******'
						type={showConfirmPassword ? 'text' : 'password'}
						className='mb-0'
						onChange={e => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>
					<Button
						appearance='svg'
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className={styles.buttonpasscon}
					>
						<ShowPasswordIcon className='h-9 w-9' />
					</Button>
				</div>
				<Button appearance='primary' className={styles.btncreate} onClick={onSubmit}>
					CREATE ACCOUNT
				</Button>
				<p className='mb-2'>OR SIGN UP WITH</p>
				<div className='flex flex-row'>
					<Button
						appearance='primary'
						className={styles.btnfacebook}
						onClick={() => signIn('facebook', { callbackUrl: '/' })}
					>
						FACEBOOK
						<FacebookIcon />
					</Button>
					<Button
						appearance='primary'
						onClick={() => signIn('google', { callbackUrl: '/' })}
						className={styles.btngoogle}
					>
						GOOGLE
						<GoogleIcon />
					</Button>
				</div>
				<div className='flex flex-row'>
					<p>Already have account?</p>
					<Link href='/auth/sign-in' className={styles.link}>
						<Button appearance='svg' className='text-primary-main'>
							Login now
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignUp
