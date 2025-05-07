import styled from '@emotion/styled'
import { useMemo, useState } from 'react'
import { MobileLandingInfoCard } from '@components/LandingPage/ui/mobile/Mobile-LandingInfoCard'
import sharingIcon from '@assets/images/landingPage/sharing-icon.svg'
import mentoringIcon from '@assets/images/landingPage/mentoring-icon.svg'
import questionIcon from '@assets/images/landingPage/question-icon.svg'
import mobileintroduceBg from '@assets/images/landingPage/mobile-IntroduceSectionBg.png'
import { ModalGuide } from '@components/modal/ModalGuide'
import { modalData } from '@components/modal/modalGuide-data'

export function MobileIntroduceSection() {
  //'Sharing' | 'Mentoring' | 'Question' 이런 유니언 타입
  const [selectedModalKey, setSelectedModalKey] = useState<null | keyof typeof modalData>(null)

  const updateModalKey = (key: keyof typeof modalData) => {
    setSelectedModalKey(key)
  }

  const handleModalClose = () => {
    setSelectedModalKey(null)
  }

  //선택된 카드에 맞는 모달 데이터를 꺼내는 코드
  const modalInfo = useMemo(() => (selectedModalKey ? modalData[selectedModalKey] : null), [selectedModalKey])

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
        <MobileLandingInfoCard infoText="이용방법" imgSrc={questionIcon} onClick={() => updateModalKey('Sharing')} />
        <MobileLandingInfoCard infoText="품앗이 규칙" imgSrc={mentoringIcon} onClick={() => updateModalKey('Mentoring')} />
        <MobileLandingInfoCard infoText="세부안내" imgSrc={sharingIcon} onClick={() => updateModalKey('Question')} />
      </IntroduceCardList>

      {modalInfo !== null &&
        (modalInfo.type === 'swiper' ? (
          <ModalGuide type="swiper" contents={modalInfo.contents} onClose={handleModalClose} title={modalInfo.title} />
        ) : (
          <ModalGuide type="text" content={modalInfo.content} onClose={handleModalClose} title={modalInfo.title} />
        ))}
    </IntroduceSectionContainer>
  )
}

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
  @media (max-width: 1024px) {
    gap: 0;
  }
`

const IntroducePoomasi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1024px) {
    margin: 1.875rem 0;
    gap: 0.8rem;
  }
`

const IntroduceTitleText = styled.div`
  color: #068372;
  text-align: center;
  font-size: 2rem;
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
  gap: 0.75rem;
  /* padding-bottom: 160px; */
`
