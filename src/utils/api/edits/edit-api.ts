import customAxios from '@utils/api/customAxios'
import { PostQnaAnswerResponse } from '@utils/api/posts'

export const EditsApi = {
  //질문 수정용
  patchQna: async (publicId: string, questionText: string): Promise<void> => {
    return await customAxios
      .patch<void>(`/posts/qna/${publicId}`, {
        question_text: questionText,
      })
      .then((res) => res.data)
  },

  // 답변 수정용
  patchQnaAnswer: async (publicId: string, answerText: string): Promise<PostQnaAnswerResponse> => {
    return await customAxios
      .patch<PostQnaAnswerResponse>(`/posts/qna/${publicId}/answer`, {
        answer_text: answerText,
      })
      .then((res) => res.data)
  },

  //품앗이꾼 프로필 수정용
  patchMentoProfile: async (mentoNewProfileText: string): Promise<void> => {
    return await customAxios
      .patch<void>(`/api/v1/accounts/mentor`, {
        description: mentoNewProfileText,
      })
      .then((res) => res.data) //일관성을 위해 통일: 사용하는 모든 API가 .data만 반환하는 구조가 된다면 유지보수에 유리
  },
}
