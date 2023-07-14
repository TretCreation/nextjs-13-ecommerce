import { FC, useState } from 'react'

import { CrossIcon } from '@/public'
import { Button, Input, Modal } from '@/src/components'
import { PaymentService } from '@/src/services/PaymentService'

import styles from './ModalTTN.module.scss'

interface IModalTTNProps {
  handleClose: () => void
  isOpen: boolean
}

const ModalTTN: FC<IModalTTNProps> = ({ handleClose, isOpen }) => {
  const [ttn, setTtn] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [phone, setPhone] = useState<string>('+380')
  const [email, setEmail] = useState<string>('')

  const onSubmitViberSMS = async () => {
    // ?
    const resViber = await PaymentService.sendViberTtn(Number(phone.replace('+', '')), ttn)
    if (!resViber) await PaymentService.sendSMSTtn(Number(phone.replace('+', '')), ttn)

    setError('success sent to viber/sms')
  }

  const onSubmitEmail = async () => {
    await PaymentService.sendEmailTtn(email, ttn)

    setError('success sent to email')
  }

  if (!isOpen) return null

  return (
    <Modal wrapperId='react-portal-modal' handleClose={handleClose}>
      <CrossIcon onClick={handleClose} className={styles.svg} />
      <div className={styles.add}>
        <p>TTN</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='TTN'
          onChange={e => setTtn(e.target.value)}
          className='mb-5'
        />
        <p>Email</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
          className='mb-5'
        />
        {error === 'success sent to email' && <p className={styles.submit}>Success!</p>}
        <Button appearance='primary' onClick={onSubmitEmail} className='mb-10'>
          Sent to Email
        </Button>
        <p>Viber/SMS</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='+380'
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className='mb-5'
        />
        {error === 'success sent to viber/sms' && <p className={styles.submit}>Success!</p>}
        <Button appearance='primary' onClick={onSubmitViberSMS}>
          Sent to Viber/SMS
        </Button>
      </div>
    </Modal>
  )
}

export default ModalTTN
