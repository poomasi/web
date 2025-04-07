import styled from '@emotion/styled'
import { getPcVw , getMobileVh } from '@utils/responsive'

interface LandingInfoCardProps {
  infoText: string
  imgSrc: string
}

export function LandingInfoCard({ infoText, imgSrc }: LandingInfoCardProps) {
  return (
    <LandingInfoCardContainer>
      <InfoCardImage src={imgSrc} />
      <InfoCardText>{infoText}</InfoCardText>
    </LandingInfoCardContainer>
  )
}

const LandingInfoCardContainer = styled.div`
  gap: 1.625rem;
  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.25rem ${getPcVw(20)};
  border-radius: 1.375rem;
  background: #fff;

  @media (max-width: 375px) {
    height: ${getMobileVh(180)};
    /* width: ${getMobileVh(800)}; */
  }
`

const InfoCardImage = styled.img`
  width: auto;
  height: 70%;
`

const InfoCardText = styled.div`
  /* margin-top: 40px; */
  color: #0e0e0e;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  @media (max-width: 375px) {
    font-size: ${getMobileVh(20)};
    line-height: 100%;
  }
`
