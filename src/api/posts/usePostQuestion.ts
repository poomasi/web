import { useMutation } from '@tanstack/react-query'
import { PostsApi } from '@utils/api/posts'
import type { PostQnaParams } from '@utils/api/posts/posts-api'
// import { CareerYearType } from '@utils/api/enums'

// 질문 등록 요청을 보내고, 성공하거나 실패했을 때의 후처리를 연결할 수 있게 해주는 커스텀 훅
export function usePostQuestion(onSuccess?: () => void, onError?: () => void) {
  return useMutation({
    //mutationFn은 서버로 질문을 등록하는 API 함수
    mutationFn: (params: PostQnaParams) => PostsApi.postQna(params),
    onSuccess: () => onSuccess?.(),
    onError: () => onError?.(),
    //성공/실패했을 때 하고 싶은 일은 컴포넌트 쪽에서 넣어주면 됌
  })
}
