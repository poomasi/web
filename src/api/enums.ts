export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum AccountType {
  USER = 'USER',
  MENTOR = 'MENTOR',
  STAFF = 'STAFF',
}

export enum CareerYearType {
  ACADEMIC = 'U',
  JOB_SEEKER = 'R',
  JUNIOR = 'N',
  MIDDLE = 'S',
}

export const CAREER_YEAR_OPTIONS = [
  { value: CareerYearType.ACADEMIC, label: '대학생' },
  { value: CareerYearType.JOB_SEEKER, label: '취준생' },
  { value: CareerYearType.JUNIOR, label: '신입~3년차' },
  { value: CareerYearType.MIDDLE, label: '3년차 이상' },
]

export enum AskerSpecificType {
  SPECIALTY = 'SPECIALTY',
  NONE_SPECIALTY = 'NONE_SPECIALTY',
}

export const SPECIFIC_TYPE_OPTIONS = [
  { value: AskerSpecificType.SPECIALTY, label: '전공자' },
  { value: AskerSpecificType.NONE_SPECIALTY, label: '비전공자' },
]

export enum QnaAskerType {
  ALL = 'ALL',
  ME = 'ME',
}
