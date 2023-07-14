import { useEffect } from 'react'

type KeyHandler = (KeyboardEvent) => void

const useEscape = (callback: KeyHandler, isOpen: boolean) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        callback(event)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [callback, isOpen])
}

export default useEscape
