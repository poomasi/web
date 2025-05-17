import customAxios from '@utils/api/customAxios'
import { PostQnaAnswerResponse } from '@utils/api/posts'

export const EditsApi = {
  patchQna: async (publicId: string, questionText: string) => {
    return await customAxios.patch(`/posts/qna/${publicId}`, {
      question_text: questionText,
    })
  },

  // 답변 수정용 API
  patchQnaAnswer: async (publicId: string, answerText: string): Promise<PostQnaAnswerResponse> => {
    return await customAxios
      .patch<PostQnaAnswerResponse>(`/posts/qna/${publicId}/answer`, {
        answer_text: answerText,
      })
      .then((res) => res.data)
  },
}
