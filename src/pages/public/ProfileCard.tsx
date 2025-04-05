import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import Card from '@mui/material/Card'
// import { CardActionArea } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
import { useProfileCard } from '@components/LandingPage/hooks/useProfileCard.ts'
import { getPcVw } from '@utils/responsive'

export interface ProfileData {
  nickname: string
  profile_image: string
  name: string
  field: string
  company1: string
  job1: string
  company2: string
  job2: string
  is_vacation: boolean
}

interface ProfileCardProps {
  profileData: ProfileData
}

export function ProfileCard({ profileData }: ProfileCardProps) {
  const { handleProfileClick } = useProfileCard()

  return (
    <Container isVacation={profileData.is_vacation} onClick={() => handleProfileClick(profileData)}>
      {profileData.is_vacation && (
        <TextBlurOverlay>
          <div style={{ fontSize: '100px' }}>🏖</div> 휴가를 떠났어요 :D
        </TextBlurOverlay>
      )}

      <ProfilePictureWrapper>
        <ProfileImage src={profileData.profile_image} alt={'profile-image'} />
      </ProfilePictureWrapper>
      <ProfileIntroContainer>
        <ProfileName>{profileData.name}</ProfileName>
        <ProfileField>{profileData.field}</ProfileField>

        <ProfileHistory>
          <ProfileHistoryItem>{profileData.company1}</ProfileHistoryItem>
          <ProfileHistoryItem>{profileData.job1}</ProfileHistoryItem>
        </ProfileHistory>

        <ProfileHistory>
          <ProfileHistoryItem>{profileData.company2}</ProfileHistoryItem>
          <ProfileHistoryItem>{profileData.job2}</ProfileHistoryItem>
        </ProfileHistory>
      </ProfileIntroContainer>
    </Container>
  )
}

const Container = styled(Card, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isVacation',
})<{ isVacation: boolean }>`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  gap: 2rem;
  width: 100%;
  height: 428px;
  padding: 30px 0;
  position: relative;
  overflow: hidden;
  margin-top: 1.5rem;
  border-radius: 5%;
  display: flex;
  flex-direction: column;

  ${({ isVacation }) =>
    isVacation &&
    `
    filter: blur(5px);
    -webkit-filter: blur(5px);
    background: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  `}/* @media (max-width: 520px) {
    width: 9.375rem;
    height: 18.75rem;
  }

  @media (max-width: 380px) {
    width: 100%;
    height: auto;
  } */
`

const ProfilePictureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 100%;
  overflow: hidden;
`

const ProfileImage = styled.img`
  width: ${getPcVw(161)};
  height: ${getPcVw(161)};
  object-fit: contain;
`

const ProfileIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileName = styled.div`
  margin-top: 1.25rem;
  color: #0e0e0e;
  text-align: center;

  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 36px */
`

const ProfileField = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #068372;

  @media (max-width: 380px) {
    font-size: 16px;
  }
`

const ProfileHistory = styled.div`
  margin-top: 10%;
  font-size: 13px;
  font-weight: bold;
  color: #aaaaaa;
  height: 30px;
`

const ProfileHistoryItem = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

const TextBlurOverlay = styled.div`
  font-size: 24px;
  word-break: keep-all;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
  z-index: 2;
`
