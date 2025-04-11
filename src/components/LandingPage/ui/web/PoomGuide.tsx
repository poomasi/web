import styled from '@emotion/styled'
import { getPcVw } from '@utils/responsive'

export function PoomGuide() {
  return (
    <PoomGuideContainer>
      <PoomGuideTextContainer>
        <PoomGuideTitleText>이용 방법</PoomGuideTitleText>
        <PoomGuideText>로그인 후 도움받고 싶은 품앗이꾼에게 질문을 작성하세요</PoomGuideText>
      </PoomGuideTextContainer>
      <PoomGuideCardList>
        <PoomGuideCard />
        <PoomGuideCard />
        <PoomGuideCard />
      </PoomGuideCardList>
    </PoomGuideContainer>
  )
}

const PoomGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 47px;
  width: 100%;
  height: 472px;
  margin-top: 160px;
`

const PoomGuideTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const PoomGuideTitleText = styled.div`
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
`

const PoomGuideText = styled.div`
  color: #0e0e0e;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 36px */
`

const PoomGuideCardList = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${getPcVw(50)};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const PoomGuideCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${getPcVw(407)};
  height: 311px;
  border-radius: 22px;
  background: #f7f7f7;
`
