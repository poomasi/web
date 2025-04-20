import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive.ts'
import { CloseButton } from '@components/button'

type ModalReferenceProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function ModalReference({ children, className, onClick }: ModalReferenceProps) {
  const [, setDefaultClassName] = useState('')

  useEffect(() => {
    setDefaultClassName(className || '')
  }, [className])

  return (
    <div>
      <ModalOverlay onClick={onClick} />
      <ModalWrapper className={className}>{children}</ModalWrapper>
    </div>
  )
}

function Header({ onClickClose }: { onClickClose: () => void }) {
  return <CloseButton onClick={onClickClose} style={{ marginLeft: getMobileVw(300 * 0.8) }}></CloseButton>
}

function Body({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

ModalReference.Header = Header
ModalReference.Body = Body

export default ModalReference

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); // 어두운 배경
  z-index: 999;
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`

const ModalWrapper = styled.section`
  position: fixed;
  top: 15%;
  left: 10%;
  z-index: 1000;
  width: ${getMobileVw(300)};
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
`
