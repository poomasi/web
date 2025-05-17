import customAxios from '@utils/api/customAxios'

export const EditsApi = {
  patchQna: async (publicId: string, questionText: string) => {
    return await customAxios.patch(`/posts/qna/${publicId}`, {
      question_text: questionText,
    })
  },
}
