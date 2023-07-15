import { FC, useEffect, useState } from 'react'

import { CrossIcon } from '@/src/assets'
import { Button, Input, Modal } from '@/src/components'
import { AdminService } from '@/src/services/AdminService'

import styles from './ModalTypes.module.scss'

interface IModalTypesProps {
  handleClose: () => void
  isOpen: boolean
}

const ModalTypes: FC<IModalTypesProps> = ({ handleClose, isOpen }) => {
  const [addType, setAddType] = useState<string>('')
  const [removeType, setRemoveType] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onAddSubmit = async () => {
    const checkType = await AdminService.checkType(addType)

    if (checkType.length === 0) {
      await AdminService.addType(addType)
      setError('success added')
      return
    }
    setError('type exists')
  }
  const onRemoveSubmit = async () => {
    const checkType = await AdminService.checkType(removeType)

    if (checkType.length !== 0) {
      await AdminService.removeType(removeType)
      setError('success removed')
      return
    }
    setError('type does not exist')
  }

  useEffect(() => {
    setError('')
  }, [handleClose])

  if (!isOpen) return null

  return (
    <Modal wrapperId='react-portal-modal' handleClose={handleClose}>
      <CrossIcon onClick={handleClose} className={styles.svg} />
      <div className={styles.add}>
        <p>New type</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='New Type'
          onChange={e => setAddType(e.target.value)}
          className='mb-10'
        />
        {error === 'type exists' && <p className={styles.error}>This type already exists</p>}
        {error === 'success added' && <p className={styles.submit}>Success!</p>}
        <Button appearance='primary' onClick={onAddSubmit}>
          Save
        </Button>
      </div>
      <div className={styles.remove}>
        <p>Remove type</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='Remove a Type'
          onChange={e => setRemoveType(e.target.value)}
          className='mb-10'
        />
        {error === 'type does not exist' && (
          <p className={styles.error}>This type does not exist</p>
        )}
        {error === 'success removed' && <p className={styles.submit}>Success!</p>}
        <Button appearance='primary' onClick={onRemoveSubmit}>
          Save
        </Button>
      </div>
    </Modal>
  )
}

export default ModalTypes
