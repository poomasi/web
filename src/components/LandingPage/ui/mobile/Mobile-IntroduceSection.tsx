import { LandingInfoCard } from '@components/LandingPage/ui/web/LandingInfoCard.tsx'
import sharingIcon from '@assets/images/landingPage/sharing-icon.svg'
import mentoringIcon from '@assets/images/landingPage/mentoring-icon.svg'
import questionIcon from '@assets/images/landingPage/question-icon.svg'
import mobileintroduceBg from '@assets/images/landingPage/mobile-IntroduceSectionBg.png'
import styled from '@emotion/styled'
import { getMobileVh } from '@utils/responsive'

export function MobileIntroduceSection() {
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
        <LandingInfoCard infoText="Sharing" imgSrc={sharingIcon} />
        <LandingInfoCard infoText="Mentoring" imgSrc={mentoringIcon} />
        <LandingInfoCard infoText="Question" imgSrc={questionIcon} />
      </IntroduceCardList>
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
  padding: ${getMobileVh(30)} 0;
`

const IntroducePoomasi = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getMobileVh(28)};
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
