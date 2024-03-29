import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { TelegramIcon } from '@/src/assets'
import { SuccessOrder } from '@/src/assets/index'
import Button from '@/src/components/ui/button/Button'

import styles from './Thanks.module.scss'

const Thanks: FC = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const orderId = urlParams.get('orderId')

  if (orderId)
    return (
      <div className={styles.thanks}>
        <p>
          Thanks for your order! We’re working hard to get it shipped to you. We hope to see you
          again in the future.
        </p>
        <Image src={SuccessOrder} alt='thanks' priority />
        <p>Your Order №: {orderId}</p>
        <Link href='https://t.me/TretStore_bot'>
          <Button appearance='primary'>
            <TelegramIcon />
            <p>Telegram</p>
          </Button>
        </Link>
      </div>
    )
  return <div>Something goes wrong...</div>
}

export default Thanks
