import styled from '@emotion/styled'
import LandingTitleBackground from '@assets/images/landingPage/landing-title-backgorund.png'

export default function TitleSection() {
  return (
    <TitleSectionContainer>
      <TitleContainer>
        <Title style={{ fontWeight: 'bold' }}>품앗이</Title>
        <Title>대학생 전문 상담 멘토링</Title>
      </TitleContainer>
      <Description>현업 개발자 품앗이꾼들에게 도움을 받아보세요 !</Description>
      <QuestionButton>질문하기</QuestionButton>
    </TitleSectionContainer>
  )
}

const TitleSectionContainer = styled.div`
  width: 100%;
  height: 830px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #fefffb 28.86%, #fafcf6 90.48%);
  background-image: url(${LandingTitleBackground});
  background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복
  padding: 140px 0;
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
  width: 406px;
  height: 80px;
  border-radius: 45.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #3ecdba;
  color: white;

  font-size: 28px;
  line-height: 150%;
  margin-top: 75px;
`
