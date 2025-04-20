import { KakaoLoginCallback } from '@utils/kakao-login'

export function LoginPage() {
  KakaoLoginCallback()
  return <div>로그인 중입니다.. 잠시만 기다려주세요</div>
}
