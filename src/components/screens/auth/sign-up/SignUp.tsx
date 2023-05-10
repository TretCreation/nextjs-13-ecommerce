import { ShowPasswordIcon } from '@/public'
import Button from '@/src/components/ui/button/Button'
import Input from '@/src/components/ui/input/Input'
import { AuthService } from '@/src/services/AuthService'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import styles from './SignUp.module.scss'

interface IData {
	hasError: boolean
	body: []
}

const SignUp: FC = () => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
	const [error, setError] = useState<string>()

	const router = useRouter()

	const onSubmit = async () => {
		if (password === confirmPassword) {
			const res = await AuthService.createUser(name, email, password)
			if (res.errorMessage) {
				setError(res.errorMessage)
			} else {
				router.replace(`/`)
			}
			console.log('res: ', res)
			return res
		}
		setError('Those passwords didn’t match. Try again.')
	}

	return (
		<div className={styles.menu}>
			<div className={styles.h1}>
				<h1>CREATE AN ACCOUNT</h1>
				<p>Register for new costumer</p>
			</div>
			<div className={styles.input}>
				<p>Full Name</p>
				<Input
					appearance='solid'
					placeholder='Your name'
					type='text'
					className='mb-1'
					onChange={e => setName(e.target.value)}
					value={name}
				/>
				{error ? <p className='text-primary-main'>{error}</p> : <></>}
				<p>Email address</p>
				<Input
					appearance='solid'
					placeholder='yourmail@mail.com'
					type='email'
					className='mb-1'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
				<p>Password</p>
				<Input
					appearance='solid'
					placeholder='*******'
					// type='password'
					type={showPassword ? 'text' : 'password'}
					className='mb-1'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				<Button appearance='svg' onClick={() => setShowPassword(!showPassword)}>
					<ShowPasswordIcon className='h-9 w-9' />
				</Button>
				<p>Confirm Password</p>
				<Input
					appearance='solid'
					placeholder='*******'
					type={showConfirmPassword ? 'text' : 'password'}
					className='mb-3'
					onChange={e => setConfirmPassword(e.target.value)}
					value={confirmPassword}
				/>
				<Button
					appearance='svg'
					onClick={() => setShowConfirmPassword(!showConfirmPassword)}
				>
					<ShowPasswordIcon className='h-9 w-9' />
				</Button>
				<div className='mb-1 flex flex-row'>
					<Input type='checkbox' className='mr-1' />
					<p>I have read and agree to the terms & conditions</p>
				</div>
				<Button appearance='primary' className='mb-4' onClick={onSubmit}>
					CREATE ACCOUNT
				</Button>
				<p className='mb-2'>OR SIGN UP WITH</p>
				<div className='flex flex-row'>
					<Button
						appearance='primary'
						className='mr-2 mb-3 bg-blue-500'
						onClick={() => signIn()}
					>
						FACEBOOK
					</Button>
					<Button appearance='primary' onClick={() => signIn()}>
						GOOGLE
					</Button>
				</div>
				<div className='flex flex-row'>
					<p>Already have account?</p>
					<Link href='/auth/sign-in'>
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
