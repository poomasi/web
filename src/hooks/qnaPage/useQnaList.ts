// hooks/useQnaList.ts
import { useQuery } from '@tanstack/react-query'
import { RequestApi } from '@utils/api/request-api'
import type { GetQnaListResponse } from '@utils/api/types/qna.type'
import { QnaAskerType } from '@utils/api/enums.ts'

/*
QnA(질문-답변) 리스트 데이터를 서버에서 불러오고,
이 데이터를 React 컴포넌트에서 쉽게 쓸 수 있도록 상태 관리와 에러 처리까지 자동으로 해주는 커스텀 React 훅.
*/
export function useQnaList(qnaAskerType: QnaAskerType, teacherId: string | undefined) {
  return useQuery<GetQnaListResponse[], Error>({
    queryKey: ['qnaList', qnaAskerType, teacherId],
    /*
    queryKey
    -React Query가 서버에서 가져온 데이터를 구별하고 저장하는 고유한 이름/식별자
    -캐시(Cache), refetch, 상태 관리의 기준이 됨.

    'qnaList'
    -이 쿼리가 "QnA 리스트 데이터를 위한 것"임을 표시하는 이름표 역할

    -qnaAskerType, teacherId가 바뀌면 자동으로 새로운 데이터를 요청
    */

    //queryFn: 실제 데이터를 받아오는 함수.
    queryFn: async () => {
      const res = await RequestApi.posts.getQnaList(qnaAskerType, teacherId)
      return res.data
    },
    enabled: !!teacherId, // id가 있어야 쿼리 실행
    staleTime: 1000 * 60, // 1분 캐싱
    retry: 1,
  })
}
