import { useNavigate } from 'react-router-dom'
import { ProfileData } from '@pages/public'
import { useState } from 'react'
import { useAccountStore } from '@store/account'

export function useProfileCard() {
  const navigate = useNavigate()
  const { accountToken } = useAccountStore((state) => state)
  const [useGuideModal, setUseGuideModal] = useState(false)

  const handleProfileClick = (profile: ProfileData) => {
    if (accountToken === null) {
      setUseGuideModal(true)
      return
    }

    if (!profile.is_vacation) navigate(`/${profile.nickname}`)
  }

  return {
    handleProfileClick,
    useGuideModal,
    setUseGuideModal,
  }
}
