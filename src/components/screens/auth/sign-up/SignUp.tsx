import Button from '@/src/components/ui/button/Button'
import Input from '@/src/components/ui/input/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'
import styles from './SignUp.module.scss'

// interface ISignUpProps {
// 	any: any
// }

const SignUp: FC = () => {
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
					type='search'
					className='mb-1'
				/>
				<p>Email address</p>
				<Input
					appearance='solid'
					placeholder='yourmail@mail.com'
					type='search'
					className='mb-1'
				/>
				<p>Password</p>
				<Input
					appearance='solid'
					placeholder='********'
					type='password'
					className='mb-1'
				/>
				<p>Confirm Password</p>
				<Input
					appearance='solid'
					placeholder='********'
					type='password'
					className='mb-3'
				/>
				<div className='mb-1 flex flex-row'>
					<Input type='checkbox' className='mr-1' />
					<p>I have read and agree to the terms & conditions</p>
				</div>
				<Button appearance='primary' className='mb-4'>
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
