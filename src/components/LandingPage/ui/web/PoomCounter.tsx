import styled from '@emotion/styled'
import { usePoomCount } from '@components/LandingPage/hooks/usePoomCount.ts'

export function PoomCounter() {
  const { qnaCount, accountCount } = usePoomCount()

  return (
    <CounterContainer>
      <PoomCountIconContainer src="/landingPage/poom-count-icon.png" alt="품카운트 아이콘" loading="lazy" />
      <PoomExplainText>
        현재, <HighlightText>{accountCount}</HighlightText>명과 <HighlightText>{qnaCount}</HighlightText>번의 품을 나누었어요.
      </PoomExplainText>
    </CounterContainer>
  )
}

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url('/landingPage/poom-count-background.png');
  background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복

  gap: 40px;
  width: 100%;
  height: 466px;
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
  color: #068372;

  font-size: 56px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 84px */
`
