import { KakaoLoginCallback } from '@utils/kakao-login'

export function LoginPage() {
  KakaoLoginCallback()
  return <div>여기는 로그인페이지야.</div>
}
