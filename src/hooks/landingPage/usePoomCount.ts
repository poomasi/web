import { useEffect, useState } from 'react'
import customAxios from '@utils/api/customAxios.ts'

// 추후 type 관련 내용 은 폴더 구조 변경 필요
interface poomCountResponse {
  account_count: number
  post_count: number
}

export function usePoomCount() {
  const [accountCount, setAccountCount] = useState(102)
  const [qnaCount, setQnaCount] = useState(38)

  const fetchPoomCount = async () => {
    try {
      const response = await customAxios.get<poomCountResponse>('https://api.poomasi.kr/api/v1/posts/qna/status')
      setAccountCount(response.data.account_count)
      setQnaCount(response.data.post_count)
    } catch (error) {
      // 추후 에러 처리 어떻게 진행할 것인지 논의 필요
      // 일단 알럿으로 어떤 문제가 발생하였는지 노출하도록 함.
      if (error instanceof Error) {
        alert(`품앗이 횟수를 가져오는 도중, 오류가 발생하였습니다.\n${error.message}`)
      }
    }
  }

  useEffect(() => {
    fetchPoomCount()
  }, [])

  return {
    accountCount,
    qnaCount,
  }
}
