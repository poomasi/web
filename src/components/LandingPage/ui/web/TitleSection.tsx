import styled from '@emotion/styled'
import LandingTitleBackground from '@assets/images/landingPage/landing-title-background.png'

export default function TitleSection() {
  const handleQuestionButtonClick = () => {
    // ID로 요소를 찾아 스크롤
    const element = document.getElementById('profiles-section')
    if (element) {
      // sticky header의 높이를 고려하여 스크롤 위치 계산
      const stickyHeaderHeight = 90 // sticky 요소의 높이(px)를 여기에 입력
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + pageYOffset - stickyHeaderHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }
  return (
    <TitleSectionContainer>
      <TitleContainer>
        <Title style={{ fontWeight: 'bold' }}>품앗이</Title>
        <Title>대학생 전문 상담 멘토링</Title>
        <Description>현업 개발자 품앗이꾼들에게 도움을 받아보세요 !</Description>
        <QuestionButton onClick={handleQuestionButtonClick}>질문하기</QuestionButton>
      </TitleContainer>
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
`

const Description = styled.div`
  padding-top: 10px;
  line-height: 150%;
  font-size: 24px;
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
