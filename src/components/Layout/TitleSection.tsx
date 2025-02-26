import styled from '@emotion/styled'

export default function TitleSection() {
  return (
    <>
      <Container>
        <Title>대학생 전문 상담 멘토링,</Title>
        <Title style={{ fontWeight: 'bold' }}>품앗이</Title>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
`

const Title = styled.div`
  font-size: 45px;

  @media (max-width: 520px) {
    font-size: 30px;
  }
`
