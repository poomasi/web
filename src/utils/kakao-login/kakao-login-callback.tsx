import { useEffect } from 'react'
import axios from 'axios'
import { REDIRECT_URI, REST_API_KEY } from './variables'
import { RequestApi } from '@api/request-api'
import { useNavigate } from 'react-router-dom'
import { useAccountStore } from '@store/account'

export function KakaoLoginCallback() {
  const { setAccountToken, setPublicId, setAccountType } = useAccountStore()
  const navigate = useNavigate()

  const fetchToken = async () => {
    try {
      // URL에서 'code' 파라미터 추출
      const search = new URLSearchParams(window.location.search)
      const code = search.get('code')
      const grantType = 'authorization_code'

      // 1. 카카오에서 access_token + id_token 받기
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

      // 2. 카카오 id_token을 백엔드로 전달
      const idToken = response.data.id_token
      const kakaoLoginResponse = await RequestApi.accounts.postKakaoLogin(idToken)
      console.log('카카오 idToken 응답:', idToken)

      // 3. 백엔드 응답에서 토큰 및 ID 추출
      const accountToken = kakaoLoginResponse.data.account_token
      const publicId = kakaoLoginResponse.data.public_id

      // 4. 토큰 디코딩으로 account_type 추출
      const payloadBase64 = accountToken.split('.')[1]
      const decodedPayload = JSON.parse(atob(payloadBase64))
      const accountTypeFromToken = decodedPayload.account_type
      console.log('디코딩된 account_type:', accountTypeFromToken)

      // localStorage에 사용자 정보 저장
      setPublicId(publicId)
      setAccountToken(accountToken)
      setAccountType(accountTypeFromToken)

      console.log('account_token:', accountToken) //account_type확인
      console.log('public_id:', publicId)
      // setPublicId(kakaoLoginResponse.data.public_id)
      // setAccountToken(kakaoLoginResponse.data.account_token)
      // setAccountType(kakaoLoginResponse.data.account_type)

      // 로그인 전 방문했던 URL 확인 후 이동 (없으면 기본값)
      const beforeLoginUrl = localStorage.getItem('before_login_url')
      localStorage.removeItem('before_login_url')
      navigate(beforeLoginUrl || 'http://localhost:3000')
      // window.location.href = beforeLoginUrl || 'http://localhost:3000'
      // navigate(beforeLoginUrl || 'https://poomasi.kr')
    } catch (error) {
      console.error('카카오 로그인 에러:', error)
    }
  }

  //kakao로부터 라다이렉트 당해서 진입했을 때 발동
  useEffect(() => {
    console.log('KakaoLoginCallback 렌더됨')
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
