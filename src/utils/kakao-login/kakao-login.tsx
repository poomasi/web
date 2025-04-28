import styled from '@emotion/styled'
import { KAKAO_LOGIN_URL } from './variables'
import { useLocation } from 'react-router-dom'
import kakaoLogo from '@assets/images/kakao-logo.svg'

export function KakaoLogin() {
  const location = useLocation() //현재 페이지의 URL 정보를 가져오기

  const beforeLoginUrl: string = location.pathname

  //사용자가 현재 페이지에서 카카오 로그인을 진행하면, 로그인 후 다시 원래 페이지로 돌아갈 수 있도록
  if (!beforeLoginUrl.includes('kakao-login-callback')) {
    localStorage.setItem('before_login_url', beforeLoginUrl)
    //사용자가 로그인하기 전의 페이지 URL을 localStorage에 저장
  }

  return (
    <KakaoLoginButton onClick={() => (window.location.href = KAKAO_LOGIN_URL)}>
      <KakaoIcon src={kakaoLogo} alt="카카오 로그인 아이콘" />
      카카오 로그인
    </KakaoLoginButton>
  )
}

const KakaoLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #fee500;
  color: #000;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #ffeb3b;
  }

  @media (max-width: 1024px) {
    font-size: 12px;
    font-weight: 500;
    padding: 7px 12px;
    border-radius: 6px;
  }
`
const KakaoIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;

  @media (max-width: 1024px) {
    width: 0.75rem;
    height: 0.75rem;
  }
`
