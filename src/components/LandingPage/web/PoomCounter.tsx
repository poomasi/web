import { useEffect, useState } from 'react'
import poomCountIcon from '@assets/images/landingPage/poom-count-icon.svg'
import poomCountBackground from '@assets/images/landingPage/poom-count-background.png'
import styled from '@emotion/styled'
import customAxios from '@api/customAxios.ts'

interface poomCountResponse {
  account_count: number
  post_count: number
}

export function PoomCounter() {
  const [accountCount, setAccountCount] = useState(102)
  const [qnaCount, setQnaCount] = useState(38)

  const fetchPoomCount = async () => {
    try {
      const response = await customAxios.get<poomCountResponse>('https://api.poomasi.kr/api/v1/posts/qna/status')
      setAccountCount(response.data.account_count)
      setQnaCount(response.data.post_count)
    } catch (error) {
      alert(`${error.message}`)
    }
  }

  useEffect(() => {
    fetchPoomCount()
  }, [])

  return (
    <CounterContainer>
      <PoomCountIconContainer src={poomCountIcon} />
      <PoomExplainText>
        현재, <HighlightText>{accountCount}명</HighlightText>과 <HighlightText>{qnaCount}번</HighlightText>의 품을 나누었어요.
      </PoomExplainText>
    </CounterContainer>
  )
}

const CounterContainer = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url(${poomCountBackground});
  background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복

  gap: 40px;
  width: 100vw;
  height: 566px;
`

const PoomExplainText = styled.div`
  color: #0e0e0e;

  font-size: 56px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 84px */
`

const PoomCountIconContainer = styled.img`
  width: 134px;
  height: 134px;
`

const HighlightText = styled.span`
  color: #6ab04a;
`
