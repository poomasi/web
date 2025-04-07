import styled from '@emotion/styled'
import mobileLandingTitleBg from '@assets/images/landingPage/mobile-TitleSectionBg.png'
//mobileLandingTitleBg로 바로 선언해버리는건가..???
import {getMobileVh, getMobileVw} from '@utils/responsive';

export function MobileTitleSection() {
  return (
    <TitleSectionContainer>
      <TitleContainer>
        <Title style={{ fontWeight: 'bold' }}>품앗이</Title>
        <Title>대학생 전문 상담 멘토링</Title>
        <Description>현업 개발자 품앗이꾼들에게 도움을 받아보세요 !</Description>
        <QuestionButton>질문하기</QuestionButton>
      </TitleContainer>
    </TitleSectionContainer>
  )
}

const TitleSectionContainer = styled.div`
  width: 100%;
  height: ${getMobileVh(600)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #fefffb 28.86%, #fafcf6 90.48%);
  background-image: url(${mobileLandingTitleBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* padding: 140px 0; */
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 80px;
  line-height: 160%;

  @media (max-width: 520px) {
    font-size: 30px;
  }
`

const Description = styled.div`
  padding-top: 10px;
  line-height: 150%;
  font-size: 24px;

  @media (max-width: 520px) {
    font-size: 15px;
  }
`

const QuestionButton = styled.div`
  width: 100%;
  height: 3.75rem;
  border-radius: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3ecdba;
  color: white;

  font-size: 1.75rem;
  line-height: 150%;
  margin-top: 4.6875rem;

  @media (max-width: 375px) {
    width: ${getMobileVw(200)};
    font-size: ${getMobileVh(28)};
  }
`
