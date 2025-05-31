import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { useAccountStore } from '@store/account'
import { useEffect, useState } from 'react'

export function useEditAuthority() {
  const { teacherAccount } = useDetailPageContext()
  const { publicId, accountType } = useAccountStore()
  const [isAuthority, setIsAuthority] = useState<boolean>(false)

  useEffect(() => {
    if (teacherAccount && accountType && ['MENTOR', 'STAFF'].includes(accountType)) {
      setIsAuthority(teacherAccount.public_id === publicId)
    }
  }, [teacherAccount, accountType, publicId])

  return {
    teacherAccount,
    publicId,
    accountType,
    isAuthority,
    setIsAuthority,
  }
}
