import { useNavigate } from 'react-router-dom'
import { ProfileData } from '@pages/public'
import { useState } from 'react'
import { useAccountStore } from '@store/account'

export function useProfileCard() {
  const navigate = useNavigate()
  const { accessToken } = useAccountStore((state) => state)
  const [useGuideModal, setUseGuideModal] = useState(false) //모달띄울지말지 결정
  const [selectedCardKey, setSelectedCardKey] = useState<'Sharing' | 'Mentoring' | 'Question' | null>(null)

  const handleProfileClick = (profile: ProfileData) => {
    if (accessToken === null) {
      setUseGuideModal(true)
      setSelectedCardKey('Sharing') //이게 문제였다...ㅠㅠㅠ해결완료...나중에 벨로그회고
      // console.log('useGuideModal 실행됨:', useGuideModal)
      return
    }
    setSelectedCardKey('Sharing')

    if (!profile.is_vacation) navigate(`/${profile.nickname}`)
  }

  return {
    handleProfileClick,
    useGuideModal,
    setUseGuideModal,
    selectedCardKey,
  }
}
