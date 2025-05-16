// 📄 src/hooks/useIsAnswerBlurred.ts
import { useCallback } from 'react'
import { useAccountStore } from '@store/account'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider'
import { GetQnaListResponse } from '@api/types'
import { AccountType } from '@api/enums.ts'

export function useIsAnswerBlurred() {
  const { accountType, publicId } = useAccountStore()
  const { teacherAccount } = useDetailPageContext()

  return useCallback(
    (question: GetQnaListResponse) => {
      if (question.is_secret === 0) return false

      const isMentor = accountType === AccountType.MENTOR
      const isOwner = question.questioner_public_id === publicId
      const isMatchingTeacher = teacherAccount?.public_id === publicId

      if (isMentor && isMatchingTeacher) return false
      if (isOwner) return false

      return true
    },
    [accountType, publicId, teacherAccount?.public_id],
  )
}
