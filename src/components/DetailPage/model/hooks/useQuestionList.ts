import { useParams } from 'react-router-dom'
import { useAccountStore } from '@store/account'
import { useEffect, useState } from 'react'
import { GetQnaListResponse } from '@api/types.ts'
import { QnaAskerType } from '@api/enums.ts'
import { RequestApi } from '@api/request-api.ts'

export const useQuestionList = () => {
  const { id } = useParams()
  const { publicId } = useAccountStore()
  const [qnaDataList, setQnaDataList] = useState<GetQnaListResponse[]>([]) //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(QnaAskerType.ALL) //QnA 필터 상태 관리

  const getTeacherQnaList = async () => {
    try {
      const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
      setQnaDataList(qnas.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('', error)
      }
    }
  }

  const getIsSecretQuestion = (qna: GetQnaListResponse) => {
    // 비밀질문이 아닌 경우 모두 확인 가능
    if (qna.is_secret === 0) {
      return false
    }

    // 비밀질문인 경우, 본인만 확인가능
    if (qna.is_secret === 1) {
      return qna.questioner_public_id !== publicId
    }
    return true
  }

  useEffect(() => {
    getTeacherQnaList()
  }, [qnaAskerType])

  return {
    qnaDataList,
    setQnaDataList,
    qnaAskerType,
    setQnaAskerType,
    getIsSecretQuestion,
  }
}
