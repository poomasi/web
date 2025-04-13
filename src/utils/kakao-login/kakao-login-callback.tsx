import { useEffect } from 'react'
import axios from 'axios'
import { REDIRECT_URI, REST_API_KEY } from './variables'
import { RequestApi } from '@api/request-api'
import { useNavigate } from 'react-router-dom'

export function KakaoLoginCallback() {
  const navigate = useNavigate()
  // useEffect 내부에서 async 함수 선언 (즉시 실행 함수 제거)
  const fetchToken = async () => {
    try {
      // URL에서 'code' 파라미터 추출
      const search = new URLSearchParams(window.location.search)
      const code = search.get('code')
      const grantType = 'authorization_code'

      //POST 요청에 필요한 파라미터 생성
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: grantType,
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: code!,
        }),
        {
          headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        },
      )

      // 카카오에서 받은 id_token
      const idToken = response.data.id_token
      const kakaoLoginResponse = await RequestApi.accounts.postKakaoLogin(idToken)
      console.log('카카오 idToken 응답:', idToken)

      // localStorage에 사용자 정보 저장
      localStorage.setItem('public_id', kakaoLoginResponse.data.public_id)
      localStorage.setItem('account_token', kakaoLoginResponse.data.account_token)

      // 로그인 전 방문했던 URL 확인 후 이동 (없으면 기본값)
      const beforeLoginUrl = localStorage.getItem('before_login_url')
      localStorage.removeItem('before_login_url')

      navigate(beforeLoginUrl || 'https://poomasi.kr')
    } catch (error) {
      console.error('카카오 로그인 에러:', error)
    }
  }

  //kakao로부터 라다이렉트 당해서 진입했을 때 발동
  useEffect(() => {
    fetchToken()
  }, [])

  return null
}

/*
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
    
    */
