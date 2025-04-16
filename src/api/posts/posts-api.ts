import { QnaAskerType } from '@api/enums'
// import requestHandler from '@api/request-handler'
import { GetQnaListResponse, GetQnaStatusResponse } from '@api/types'
import { CareerYearType } from '@api/enums'
import customAxios from '@api/customAxios.ts'

const PATH = '/posts'

interface PostQnaParams {
  id: string | undefined
  isSecret: boolean
  careerYear: CareerYearType
  isMajor: boolean
  questionText: string
}

export const PostsApi = {
  //postQna: 비동기 함수
  postQna: async ({ id, isSecret, careerYear, isMajor, questionText }: PostQnaParams) => {
    //requestHandler: 서버에 데이터를 보내는 함수
    return await customAxios.post<null>(PATH + '/qna', {
      //질문을 등록하기 위해 서버에 데이터를 보냄
      nickname: id,
      is_secret: isSecret,
      career_year: careerYear,
      is_major: isMajor,
      question_text: questionText,
    })
  },

  //질문 목록을 가져오는 GET 요청
  getQnaList: async (type: string = QnaAskerType.ALL, id?: string) => {
    return await customAxios.get<GetQnaListResponse[]>(PATH + `/qna?type=${type}&nickname=${id}`) // API 엔드포인트
  },

  getQnaStatus: async () => {
    return await customAxios.get<GetQnaStatusResponse>(PATH + `/qna/status`)
  },
}
