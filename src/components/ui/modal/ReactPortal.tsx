import React, { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IReactPortalProps {
  children: React.ReactElement[]
  wrapperId: string
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

const ReactPortal: FC<IReactPortalProps> = ({ children, wrapperId }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>()

  useEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (!wrapperElement) return null

  return createPortal(children, wrapperElement)
}

export default ReactPortal
