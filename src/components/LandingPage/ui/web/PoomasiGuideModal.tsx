import ModalReference from '@components/modal/ModalReference.tsx'
import styled from '@emotion/styled'
import guide01 from '@assets/images/landingPage/mobile-landing-guide01.png'
import guide02 from '@assets/images/landingPage/mobile-landing-guide02.png'
import guide03 from '@assets/images/landingPage/mobile-landing-guide03.png'

type PoomasiGuideModalProps = {
  onClose: () => void
}

export function PoomasiGuideModal({ onClose }: PoomasiGuideModalProps) {
  const guideItemList = [
    {
      imageSrc: guide01,
      text: '1. 카카오톡으로 간편하게 로그인해요.',
    },
    {
      imageSrc: guide02,
      text: '2. 관심 있는 분야의 품앗이꾼을 찾아요.',
    },
    {
      imageSrc: guide03,
      text: '3. 도움이 필요한 내용을 자유롭게 질문해요.',
    },
  ]

  return (
    <PoomasiGuideModalContainer onClick={onClose}>
      <ModalReference.Header onClickClose={onClose} />
      <ModalReference.Body>
        <ModalTitle>이용 방법</ModalTitle>
        <GuideList>
          {guideItemList.map((item) => (
            <GuideItem key={item.text}>
              <GuideImg src={item.imageSrc} />
              <GuideText>{item.text}</GuideText>
            </GuideItem>
          ))}
        </GuideList>
      </ModalReference.Body>
    </PoomasiGuideModalContainer>
  )
}

const PoomasiGuideModalContainer = styled(ModalReference)`
  width: 1200px;
    
  @media (max-width: 1320px) {
    width: 767px;
  }
`

const ModalTitle = styled.div`
  color: #0e0e0e;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
  margin-bottom: 16px;
`

const GuideList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  margin: 0;
  padding-bottom: 60px;

  @media (max-width: 1320px) {
    padding-bottom: 30px;
  }
`

const GuideItem = styled.div`
  display: flex;
  align-items: center;
    justify-content: center;
  flex-direction: column;
  font-size: 16px;
  gap: 24px;
`

const GuideImg = styled.img`
  width: 322px;
  height: 246px;
  border-radius: 16px;
    
  @media (max-width: 1320px) {
    width: 310px;
    height: 220px;
  }
    
`

const GuideText = styled.div`
  color: #4e5053;

  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
`
