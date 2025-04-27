import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive.ts'
import { CloseButton } from '@components/button'
import { useMobileStore } from '@store/useMobileStore'

type ModalReferenceProps = {
  children: React.ReactNode
  onClick?: () => void
}

function ModalReference({ children, onClick }: ModalReferenceProps) {
  const isMobile = useMobileStore((state) => state.isMobile)

  return isMobile ? (
    <ModalContainer className="ModalReference">
      <ModalOverlay onClick={onClick} className="ModalOverlay" />
      <ModalWrapper className="ModalWrapper">{children}</ModalWrapper>
    </ModalContainer>
  ) : (
    <div style={{ position: 'relative' }} className="ModalReference">
      <ModalOverlay onClick={onClick} className="ModalOverlay" />
      <ModalWrapper className="ModalWrapper">{children}</ModalWrapper>
    </div>
  )
}

function Header({ onClickClose }: { onClickClose: () => void }) {
  return (
    <ModalHeader>
      <CloseButton onClick={onClickClose}></CloseButton>
    </ModalHeader>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

ModalReference.Header = Header
ModalReference.Body = Body

export default ModalReference

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999999999999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); // 어두운 배경
  z-index: 99999;
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
  left: 50%;
  transform: translate(-50%);
  z-index: 9999999999;
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

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem;

  @media (max-width: 767px) {
    padding: 0.6rem;
  }
`
