import React, { FC, useEffect, useRef } from 'react'

import { useScrollBlock } from '@/src/components'

import styles from './Modal.module.scss'
import ReactPortal from './ReactPortal'
import useOnClickOutside from './useOnClickOutside'

interface ModalProps {
  children: React.ReactNode
  wrapperId: string
  handleClose: () => void
}

const Modal: FC<ModalProps> = ({ children, wrapperId, handleClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  //* Close modal on click outside
  useOnClickOutside(ref, () => handleClose())

  //* Lock scroll on modal
  useScrollBlock()

  //* Close modal on escape
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])

  return (
    <ReactPortal wrapperId={wrapperId}>
      <div className={styles.modal} />
      <div className={styles.content} ref={ref}>
        {children}
      </div>
    </ReactPortal>
  )
}

export default Modal
