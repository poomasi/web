import { useLandingDetailGuide } from '@components/LandingPage/hooks/useLandingDetailGuide.ts'
import styled from '@emotion/styled'
import detailGuideIcon from '@assets/images/landingPage/detail-guide-icon.svg'
import { getMobileVw } from '@utils/responsive'

export function MobileLandingDetailGuide() {
  const { guideTextList } = useLandingDetailGuide()

  return (
    <LandingDetailGuideContainer>
      <SectionTitle>세부 안내</SectionTitle>
      <SectionGuideList>
        {guideTextList.map((guideText) => (
          <GuideText key={guideText}>
            <img src={detailGuideIcon} style={{ width: '5%' }} /> {guideText}
          </GuideText>
        ))}
      </SectionGuideList>
    </LandingDetailGuideContainer>
  )
}

const LandingDetailGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  height: auto;
  @media (max-width: 767px) {
    padding: 3.125rem ${getMobileVw(20)};
    gap: 1.5rem;
  }
  /* margin: 60px auto 0; */
`

const SectionTitle = styled.div`
  color: #0e0e0e;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`

const SectionGuideList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  gap: 28px;
`

const GuideText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  color: #28292a;

  font-size: 0.9rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 33px */
  gap: 12px;

  border-radius: 1.125rem;
  background: #f7f7f7;

  padding: 3vw;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`
