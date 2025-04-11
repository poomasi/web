import { useLandingDetailGuide } from '@components/LandingPage/hooks/useLandingDetailGuide.ts'
import styled from '@emotion/styled'
import detailGuideIcon from '@assets/images/landingPage/detail-guide-icon.svg'
import { getPcVw } from '@utils/responsive'

export function LandingDetailGuide() {
  const { guideTextList } = useLandingDetailGuide()

  return (
    <LandingDetailGuideContainer>
      <SectionTitle>세부 안내</SectionTitle>
      <SectionGuideList>
        {guideTextList.map((guideText) => (
          <GuideText key={guideText}>
            <img src={detailGuideIcon} /> {guideText}
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
  gap: 40px;
  width: ${getPcVw(1320)};
  height: 100%;
  margin: 60px auto 0;
`

const SectionTitle = styled.div`
  color: #0e0e0e;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
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

  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 33px */
  gap: 12px;

  border-radius: 18px;
  background: #f7f7f7;

  padding: 26px 0 26px 36px;
`
