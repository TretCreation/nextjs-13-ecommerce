import { IUserSession } from '@/src/interfaces/user.interface'
import { AccountService } from '@/src/services/AccountService'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './ProfileInfo.module.scss'

const ProfileInfo = () => {
	const { data: session } = useSession()

	const [info, setInfo] = useState<IUserSession>()

	useEffect(() => {
		const fetchProfileInfo = async () => {
			const res = await AccountService.getInfo(session?.user.id)
			setInfo(res)
		}
		if (session?.user) fetchProfileInfo()
	}, [session?.user])

	if (info)
		return (
			<div className={styles.EDIT}>
				<Image src={info.img} alt={info.name} width={60} height={0} />
				<p>Name: {info.name}</p>
				<p>{info.email && `Email: ${info.email}`}</p>
				<p>{info.emailFacebook && `Email Facebook: ${info.emailFacebook}`}</p>
				<p>{info.emailGoogle && `Email Google: ${info.emailGoogle}`}</p>
			</div>
		)
	return null
}

export default ProfileInfo
