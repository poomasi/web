import { useEffect } from 'react'
import axios from 'axios'
import { REDIRECT_URI, REST_API_KEY } from './variables'
import { RequestApi } from '@api/request-api'

export function KakaoLoginCallback() {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams
    const code = params.get('code')
    const grantType = 'authorization_code'

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } }
      )
      .then((res: any) => {
        const idToken = res.data.id_token

        try {
          ;(async () => {
            const kakaoLoginResponse = await RequestApi.accounts.postKakaoLogin(idToken)

            localStorage.setItem('public_id', kakaoLoginResponse.public_id)
            localStorage.setItem('account_token', kakaoLoginResponse.account_token)
            const beforeLoginUrl: string | null = localStorage.getItem('before_login_url')
            localStorage.removeItem('before_login_url')

            window.location.href = beforeLoginUrl ? beforeLoginUrl : 'https://poomasi.kr'
          })()
        } catch (error: any) {
          console.log(error)
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  return <></>
}
