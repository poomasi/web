import { useNavigate } from 'react-router-dom'
import { ProfileData } from '@pages/public'

export function useProfileCard() {
  const navigate = useNavigate()

  const handleProfileClick = (profile: ProfileData) => {
    if (!profile.is_vacation) navigate(`/${profile.nickname}`)
  }

  return {
    handleProfileClick,
  }
}
