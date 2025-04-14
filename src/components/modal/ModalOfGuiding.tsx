import styled from '@emotion/styled'
import { CloseBtn } from '@components/button/CloseBtn'
import { guide01, guide02, guide03 } from '@assets/images/landingPage'
// import { getMobileVw } from '@utils/responsive'

interface ModalOfGuidingProps {
  onClose: () => void
  //아무 인자도 받지 않고 void(반환 없음)를 반환하는 함수
}

//props로 들어온 객체에서 onClose라는 함수를 꺼내 쓸 거야!
//ModalOfGuiding를 사용할 때 props로 onClose 함수가 꼭 필요해!
export const ModalOfGuiding = ({ onClose }: ModalOfGuidingProps) => {
  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <CloseBtn onClick={onClose} />
          <Title>이용방법</Title>
        </ModalHeader>

        <ModalContent>
          <KakaoImageWrapper>
            <img src={guide01} alt="guide" />
          </KakaoImageWrapper>
          <GuideText>1. 카카오톡으로 간편하게 로그인해요</GuideText>
          <Dots>
            <Dot active />
            <Dot />
            <Dot />
          </Dots>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display: none;
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 90%;
  max-width: 360px;

  @media (max-width: 768px) {
    padding: 1.2rem;
    max-width: 320px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 90%;
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

// const CloseArea = styled.button`
//   background: none;
//   border: none;
//   padding: 0;
//   cursor: pointer;
// `

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`

const KakaoImageWrapper = styled.div`
  background: #e9f8f7;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`

const GuideText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
  text-align: center;
`

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`

const Dot = styled.div<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#3ECDBA' : '#ccc')};
  margin: 0 4px;
`
