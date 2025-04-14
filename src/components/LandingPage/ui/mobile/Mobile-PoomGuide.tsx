import styled from '@emotion/styled'
import { getMobileVw, getMobileVh } from '@utils/responsive'
import { guide01, guide02, guide03 } from '@assets/images/landingPage'

//props 중 img라는 값을 구조 분해해서 바로 받는다 : 구조 분해 + 타입을 동시에 작성한 문법
const PoomGuideCard = ({ img }: { img: string }) => {
  return <CardWrapper style={{ backgroundImage: `url(${img})` }} />
}

export function MobilePoomGuide() {
  return (
    <PoomGuideContainer>
      <PoomGuideTextContainer>
        <PoomGuideTitleText>이용 방법</PoomGuideTitleText>
        <PoomGuideText>로그인 후 도움받고 싶은 품앗이꾼에게 질문을 작성하세요</PoomGuideText>
      </PoomGuideTextContainer>
      <PoomGuideCardList>
        <PoomGuideCard img={guide01} />
        <PoomGuideCard img={guide02} />
        <PoomGuideCard img={guide03} />
      </PoomGuideCardList>
    </PoomGuideContainer>
  )
}

const PoomGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${getMobileVh(50)};
  width: 100%;
  padding: ${getMobileVh(40)} 0;
`

const PoomGuideTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media (max-width: 767px) {
    padding: 3.125rem 0;
  }
`

const PoomGuideTitleText = styled.div`
  text-align: center;
  font-size: ${getMobileVw(26)};
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
`

const PoomGuideText = styled.div`
  color: #0e0e0e;
  text-align: center;
  font-size: ${getMobileVw(14)};
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 36px */
`

const PoomGuideCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${getMobileVw(320)};
  height: ${getMobileVh(220)};
  border-radius: 22px;
  background-size: cover;
  background-position: center;
`
