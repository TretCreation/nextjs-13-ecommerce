import { FC, useEffect, useState } from 'react'

import { CrossIcon } from '@/src/assets'
import { Button, Input, Modal } from '@/src/components'
import { AdminService } from '@/src/services/AdminService'
import { toastError } from '@/src/utils/api/handleToastError'

import styles from './ModalBrands.module.scss'

interface IModalBrandsProps {
  handleClose: () => void
  isOpen: boolean
}

const ModalBrands: FC<IModalBrandsProps> = ({ handleClose, isOpen }) => {
  const [addBrand, setAddBrand] = useState<string>('')
  const [removeBrand, setRemoveBrand] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onAddSubmit = async () => {
    try {
      const checkBrand = await AdminService.checkBrand(addBrand)

      if (checkBrand.length === 0) {
        setError('success added')
        await AdminService.addBrand(addBrand)
      }
      setError('brand exists')
    } catch (err) {
      toastError(err)
    }
  }

  const onRemoveSubmit = async () => {
    try {
      const checkBrand = await AdminService.checkBrand(removeBrand)

      if (checkBrand.length !== 0) {
        setError('success removed')
        await AdminService.removeBrand(removeBrand)
      }
      setError('brand does not exist')
    } catch (err) {
      toastError(err)
    }
  }

  useEffect(() => {
    setError('')
  }, [handleClose])

  if (!isOpen) return null

  return (
    <Modal wrapperId='react-portal-modal' handleClose={handleClose}>
      <CrossIcon onClick={handleClose} className={styles.svg} />

      <div className={styles.add}>
        <p>New brand</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='New brand'
          onChange={e => setAddBrand(e.target.value)}
          className='mb-10'
        />
        {error === 'brand exists' && <p className={styles.error}>This brand already exists</p>}
        {error === 'success added' && <p className={styles.submit}>Success!</p>}
        <Button appearance='primary' onClick={onAddSubmit}>
          Save
        </Button>
      </div>

      <div className={styles.remove}>
        <p>Remove brand</p>
        <Input
          type='text'
          appearance='solid'
          placeholder='Remove a brand'
          onChange={e => setRemoveBrand(e.target.value)}
          className='mb-10'
        />
        {error === 'brand does not exist' && (
          <p className={styles.error}>This brand does not exist</p>
        )}
        {error === 'success removed' && <p className={styles.submit}>Success!</p>}
        <Button appearance='primary' onClick={onRemoveSubmit}>
          Save
        </Button>
      </div>
    </Modal>
  )
}

export default ModalBrands
