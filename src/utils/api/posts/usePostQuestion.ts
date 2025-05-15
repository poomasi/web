import { useMutation } from '@tanstack/react-query'
import { PostsApi } from '@utils/api/posts'
import type { PostQnaParams } from '@utils/api/posts/posts-api'
// import { CareerYearType } from '@utils/api/enums'

export function usePostQuestion(onSuccess?: () => void, onError?: () => void) {
  return useMutation({
    //mutationFn은 서버로 질문을 등록하는 실제 API 함수
    mutationFn: (params: PostQnaParams) => PostsApi.postQna(params),
    onSuccess: () => onSuccess?.(),
    onError: () => onError?.(),
  })
}
