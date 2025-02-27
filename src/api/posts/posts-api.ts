import { HttpMethod, QnaListType } from '@api/enums'
import requestHandler from '@api/request-handler'
import { GetQnaListResponse, GetQnaStatusResponse } from '@api/types'

const PATH = '/posts'

export const PostsApi = {
  postQna: async ({ id, isSecret, careerYear, isMajor, questionText }: any) => {
    return await requestHandler<null>({
      url: PATH + '/qna',
      method: HttpMethod.POST,
      data: {
        nickname: id,
        is_secret: isSecret,
        career_year: careerYear,
        is_major: isMajor,
        question_text: questionText,
      },
    })
  },

  getQnaList: async (type: string = QnaListType.ALL, id?: string) => {
    return await requestHandler<Array<GetQnaListResponse>>({ url: PATH + `/qna?type=${type}&nickname=${id}` })
  },

  getQnaStatus: async () => {
    return await requestHandler<GetQnaStatusResponse>({ url: PATH + `/qna/status` })
  },
}
