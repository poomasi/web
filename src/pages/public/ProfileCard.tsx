import styled from '@emotion/styled'
import Card from '@mui/material/Card'
// import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ProfileData {
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

interface Props {
  profileData: ProfileData
}

export function ProfileCard({ profileData }: Props) {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    if (!profileData.is_vacation) navigate(`/${profileData.nickname}`)
  }

  return (
    <Container isVacation={profileData.is_vacation} onClick={handleProfileClick}>
      {profileData.is_vacation && (
        <TextBlurOverlay>
          <div style={{ fontSize: '100px' }}>🏖</div> 휴가를 떠났어요 :D
        </TextBlurOverlay>
      )}

      <ProfilePictureWrapper>
        <ProfileImage src={profileData.profile_image} alt={'profile-image'} />
      </ProfilePictureWrapper>
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
    </Container>
  )
}

// 🔹 휴가 여부에 따라 스타일 변경
const Container = styled(Card)<{ isVacation: boolean }>`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px 17px 10px 3px;
  width: 180px;
  height: 332px;
  position: relative;
  overflow: hidden;

  ${({ isVacation }) =>
    isVacation &&
    `
    filter: blur(5px);
    -webkit-filter: blur(5px);
    background: rgba(255, 255, 255, 0.5);
    pointer-events: none;
  `}

  @media (max-width: 520px) {
    width: 150px;
    height: 300px;
  }

  @media (max-width: 380px) {
    width: 140px;
    height: 290px;
  }
`

const ProfilePictureWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ProfileName = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`

const ProfileField = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: var(--gray-color);

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
  font-size: 13px;
  font-weight: bold;
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
