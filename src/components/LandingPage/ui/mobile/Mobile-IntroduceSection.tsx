import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { LandingInfoCard } from '@components/LandingPage/ui/web/LandingInfoCard.tsx'
import sharingIcon from '@assets/images/landingPage/sharing-icon.svg'
import mentoringIcon from '@assets/images/landingPage/mentoring-icon.svg'
import questionIcon from '@assets/images/landingPage/question-icon.svg'
import mobileintroduceBg from '@assets/images/landingPage/mobile-IntroduceSectionBg.png'
import { getMobileVh, getMobileVw } from '@utils/responsive'
import { useCloseBtn } from '@components/button/closeButton/useCloseBtn'
import { ModalGuide } from '@components/modal/ModalGuide'
import { CloseButton } from '@components/button/closeButton/CloseBtn'
import { modalData } from '@components/modal/modalGuide-data'

export function MobileIntroduceSection() {
  //'Sharing' | 'Mentoring' | 'Question' 이런 유니언 타입
  const [selectedModalKey, setSelectedModalKey] = useState<null | keyof typeof modalData>(null)
  const { isClosed, setIsClosed, handleClose } = useCloseBtn()

  const updateModalKey = (key: keyof typeof modalData) => {
    setSelectedModalKey(key)
  }

  //선택된 카드에 맞는 모달 데이터를 꺼내는 코드
  const modalInfo = selectedModalKey ? modalData[selectedModalKey] : null

  useEffect(() => {
    if (selectedModalKey) {
      setTimeout(() => {
        setIsClosed(false)
      }, 0)
    }
  }, [selectedModalKey, setIsClosed])

  return (
    <IntroduceSectionContainer>
      <IntroducePoomasi>
        <IntroduceTitleText>품앗이꾼은요?</IntroduceTitleText>
        <IntroduceText>
          누구에게나 배울점이 있다는 믿음하에 저희가
          <br />
          가진 경험을 서로 전파해요!
        </IntroduceText>
      </IntroducePoomasi>
      <IntroduceCardList>
        <LandingInfoCard infoText="이용방법" imgSrc={sharingIcon} onClick={() => updateModalKey('Sharing')} />
        <LandingInfoCard infoText="품앗이 규칙" imgSrc={mentoringIcon} onClick={() => updateModalKey('Mentoring')} />
        <LandingInfoCard infoText="세부안내" imgSrc={questionIcon} onClick={() => updateModalKey('Question')} />
      </IntroduceCardList>

      {modalInfo && !isClosed && (
        <div>
          <ModalOverlay onClick={handleClose} />
          <ModalWrapper className="modalGuide">
            <CloseButton onClick={handleClose} style={{ marginLeft: getMobileVw(300 * 0.8) }}></CloseButton>
            <ModalTitle>{modalInfo.title}</ModalTitle>
            {modalInfo.type === 'swiper' ? (
              <ModalGuide type="swiper" contents={modalInfo.contents} />
            ) : (
              <ModalGuide type="text" content={modalInfo.content} />
            )}
            {/* 에러남: modalInfo의 구조가 type에 따라 달라지는 걸 TypeScript가 확신하지 못해서
            <ModalGuide type={modalInfo.type} contents={modalInfo.contents} content={modalInfo.content} /> */}
          </ModalWrapper>
        </div>
      )}
    </IntroduceSectionContainer>
  )
}

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
const ModalTitle = styled.h4`
  color: #333;
  font-size: 1rem;
  /* margin-: 1rem; */
`

const IntroduceSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: center;
  width: 100%;
  /* height: 846px; */
  background-image: url(${mobileintroduceBg});
  background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복
  padding: 1.875rem 0;
`

const IntroducePoomasi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    margin: 1.875rem 0;
  }
`

const IntroduceTitleText = styled.div`
  color: #068372;
  text-align: center;
  font-size: ${getMobileVh(36)};
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 54px */
`

const IntroduceText = styled.div`
  color: #0e0e0e;
  text-align: center;

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 48px */
`

const IntroduceCardList = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* padding: 20px 0; */
  gap: ${getMobileVh(30)};
  /* padding-bottom: 160px; */
`
