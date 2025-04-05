import styled from '@emotion/styled'

interface LandingInfoCardProps {
  infoText: string
  imgSrc: string
}

export function MobileLandingInfoCard({ infoText, imgSrc }: LandingInfoCardProps) {
  return (
    <LandingInfoCardContainer>
      <InfoCardImage src={imgSrc} />
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
`

const InfoCardImage = styled.img`
  width: 270px;
  height: 210px;
`

const InfoCardText = styled.div`
  margin-top: 40px;
  color: #0e0e0e;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 42px */
`
