import { LandingInfoCard } from '@components/LandingPage/ui/web/LandingInfoCard.tsx'
import sharingIcon from '@assets/images/landingPage/sharing-icon.svg'
import mentoringIcon from '@assets/images/landingPage/mentoring-icon.svg'
import questionIcon from '@assets/images/landingPage/question-icon.svg'
import introduceBackground from '@assets/images/landingPage/introduce-background.png'
import styled from '@emotion/styled'
import { getPcVw } from '@utils/responsive'
import { PoomasiGuideModal } from '@components/LandingPage/ui/web/PoomasiGuideModal.tsx'
import { useState } from 'react'

export function IntroduceSection() {
  const [useGuideModal, setuseGuideModal] = useState(false)
  const handleUseGuideModalClick = () => {
    setuseGuideModal(true)
  }

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
        <LandingInfoCard infoText="Sharing" imgSrc={sharingIcon} onClick={handleUseGuideModalClick} />
        <LandingInfoCard infoText="Mentoring" imgSrc={mentoringIcon} />
        <LandingInfoCard infoText="Question" imgSrc={questionIcon} />
      </IntroduceCardList>
      {useGuideModal && (
        <PoomasiGuideModal
          onClose={() => {
            setuseGuideModal(false)
          }}
        />
      )}
    </IntroduceSectionContainer>
  )
}

const IntroduceSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 54px;
  justify-content: center;
  width: 100%;
  background-image: url(${introduceBackground});
  background-size: 90%;
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복
  padding-bottom: 160px;
`

const IntroducePoomasi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const IntroduceTitleText = styled.div`
  color: #068372;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 54px */
`

const IntroduceText = styled.div`
  color: #0e0e0e;
  text-align: center;

  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 48px */
`

const IntroduceCardList = styled.div`
  width: ${getPcVw(1320)};
  display: flex;
  justify-content: center;
  /* padding: 20px 0; */
  gap: ${getPcVw(10)};
  /* padding-bottom: 160px; */
`
