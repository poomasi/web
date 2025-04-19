/**
 * Internal Services
 */
export interface KakaoLoginResponse {
  public_id: string
  account_token: string
}

export interface AccountListResponse {
  public_id: string
  nickname: string
  name: string
  profile_image: string
  field: string
  company1: string
  job1: string
  company2: string
  job2: string
  is_vacation: boolean
}

export interface AccountResponse {
  id: string
  name: string
  profile_image: string
  field: string
  company1: string
  job1: string
  description: string
  is_vacation: boolean
}

export interface GetQnaListResponse {
  public_id: string
  is_secret: boolean
  career_year: string
  is_major: boolean
  question_text: string
  answer_text: string
  questioner_public_id: string
  answerer_public_id: string;
  created_at: string
}

export interface GetQnaStatusResponse {
  account_count: number
  post_count: number
}
