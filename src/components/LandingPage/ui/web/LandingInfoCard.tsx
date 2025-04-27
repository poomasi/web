import styled from '@emotion/styled'

interface LandingInfoCardProps {
  infoText: string
  imgSrc: string
  onClick?: () => void
}

export function LandingInfoCard({ infoText, imgSrc, onClick }: LandingInfoCardProps) {
  return (
    <LandingInfoCardContainer onClick={onClick}>
      <InfoCardImage src={imgSrc} alt={infoText} />
      <InfoCardText>{infoText}</InfoCardText>
    </LandingInfoCardContainer>
  )
}

const LandingInfoCardContainer = styled.div`
  gap: 1.625rem;
  width: 100%;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.25rem 20px;
  border-radius: 1.375rem;
  background: #fff;

  @media (max-width: 767px) {
    height: 11.875rem;
  }
`

const InfoCardImage = styled.img`
  width: 65%;
  height: 48%;

  @media (max-width: 767px) {
    width: 80%;
    height: 60%;
  }
`

const InfoCardText = styled.div`
  /* margin-top: 40px; */
  color: #0e0e0e;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;

  @media (max-width: 767px) {
    font-size: 1.125rem;
    line-height: 120%;
  }
`
