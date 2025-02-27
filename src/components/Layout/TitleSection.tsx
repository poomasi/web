import styled from '@emotion/styled'

export default function TitleSection() {
  return (
    <>
      <TitleContainer>
        <Title>대학생 전문 상담 멘토링,</Title>
        <Title style={{ fontWeight: 'bold' }}>품앗이</Title>
      </TitleContainer>
      <div>
        <Seperator />
        <SubHead>소개</SubHead>
        <Description>
          품앗이에는 여러분에게 도움을 주려 모인
          <br />
          다양한 직군의 현업 개발자들이 있습니다.
          <br />각 분야의 전문가들에게 무료로 도움을 받아보세요 :)
          <br />
        </Description>
      </div>
    </>
  )
}

const TitleContainer = styled.div`
  padding-top: 5rem;
`

const Title = styled.div`
  font-size: 45px;

  @media (max-width: 520px) {
    font-size: 30px;
  }
`
const Seperator = styled.div`
  height: 4px;
  width: 30px;
  background-color: black;
  margin-top: 7px;
  margin-bottom: 16px;
`
const SubHead = styled.div`
  font-size: 30px;
  margin-bottom: 13px;

  @media (max-width: 520px) {
    font-size: 25px;
  }
`
const Description = styled.div`
  line-height: 1.6;
  font-size: 17px;

  @media (max-width: 520px) {
    font-size: 15px;
  }
`
