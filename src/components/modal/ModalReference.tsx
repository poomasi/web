import { useEffect, useState } from 'react'

type ModalReferenceProps = {
  children?: React.ReactNode
  className?: string
}

function ModalReference({ children, className }: ModalReferenceProps) {
  const [defaultClassName, setDefaultClassName] = useState('')

  useEffect(() => {
    setDefaultClassName(className || '')
  }, [className])

  return <div className={className}>{children}</div>
}

function Header({ onClickClose }: { onClickClose: () => void; children?: React.ReactNode }) {
  return <div onClick={onClickClose}>closeButton</div>
}

function Body({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

ModalReference.Header = Header
ModalReference.Body = Body

export default ModalReference
