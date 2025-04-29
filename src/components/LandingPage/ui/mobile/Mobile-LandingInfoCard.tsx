import styled from '@emotion/styled'

interface LandingInfoCardProps {
  infoText: string
  imgSrc: string
}

export function MobileLandingInfoCard({ infoText, imgSrc }: LandingInfoCardProps) {
  return (
    <LandingInfoCardContainer>
      <InfoCardImage src={imgSrc} className="InfoCardImage" />
      <InfoCardText>{infoText}</InfoCardText>
    </LandingInfoCardContainer>
  )
}

const LandingInfoCardContainer = styled.div`
  width: 30%;
  height: 28.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 22px;
  background: #fff;
  @media (max-width: 1320px) {
    height: 17rem;
    gap: 1rem;
  }

  @media (max-width: 1024px) {
    height: auto;
    padding: 1.25rem 20px 24px 20px;
  }
`

const InfoCardImage = styled.img`
  width: 270px;
  height: 210px;
  @media (max-width: 1024px) {
    width: 30%;
    height: 45%;
  }
  @media (max-width: 834px) {
    width: 40%;
    height: 50%;
  }
`

const InfoCardText = styled.div`
  margin-top: 40px;
  color: #0e0e0e;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 42px */
  @media (max-width: 1024px) {
    font-size: 1.125rem;
    line-height: 120%;
    font-weight: 500;
  }
`
