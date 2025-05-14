export type DefaultApiResponse<T> = {
  statusCode: number
  message: string
  data: T
  // account_type: string
}
