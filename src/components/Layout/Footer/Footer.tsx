import styled from '@emotion/styled'

export function Footer() {
  return (
    <>
      <Seperator />
      <SubHead>세부 안내</SubHead>
      <Description>
        품삯은 따로 받고 있지 않으나,
        <br />
        타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요.
        <br />
        가능한 빠르게 답변하려 노력하고 있으나,
        <br />
        품앗이꾼별 스케줄 이슈로 답변이 늦어질 수도 있다는 점 양해 부탁드립니다.
        <br />
        기타 문의 : <Mail href="mailto://poomasiofficial@gmail.com">poomasiofficial@gmail.com</Mail>
      </Description>
    </>
  )
}

const Seperator = styled.div`
  height: 4px;
  width: 30px;
  background-color: black;
  margin-top: 5rem;
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
  height: 30vh;

  @media (max-width: 520px) {
    font-size: 15px;
  }
`
const Mail = styled.a`
  text-decoration: none;

  &:hover {
    color: white;
    background-color: black;
    transition: 0.5s ease;
  }
`
