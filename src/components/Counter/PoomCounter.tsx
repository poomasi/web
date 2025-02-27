import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

export function PoomCounter() {
  const [accountCount, setAccountCount] = useState(102)
  const [qnaCount, setQnaCount] = useState(38)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('https://api.poomasi.kr/api/v1/posts/qna/status')
        const data = await response.json()

        if (response.ok) {
          setAccountCount(data.data.account_count)
          setQnaCount(data.data.post_count)
        } else {
          console.error('API 호출 실패:', data.message)
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error)
      }
    }

    fetchStatus()
  }, [])

  return (
    <CounterContainer>
      현재, <HighlightText>{accountCount}명</HighlightText>과 <HighlightText>{qnaCount}번</HighlightText>의 품을 나누었어요. 🌱
    </CounterContainer>
  )
}

const CounterContainer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #666;
  text-align: center;
  margin: 5rem 0;
`

const HighlightText = styled.span`
  color: #6ab04a;
`
