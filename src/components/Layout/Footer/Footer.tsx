import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive'
import { colors } from '@styles/foundation/color'

export function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <InquireText>
          <Mail href="mailto://poomasiofficial@gmail.com">poomasiofficial@gmail.com</Mail>
        </InquireText>
        <InquireText>Copyright ⓒ Poomasi. All Rights Reserved</InquireText>
      </FooterWrapper>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  width: 100%;
  border-top: 1px solid #eaebed;
  @media (max-width: 767px) {
    padding: 30px ${getMobileVw(20)};
  }
`

const FooterWrapper = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 300px;
  color: ${colors.gray600};

  @media (max-width: 767px) {
    font-size: 10px;
    flex-direction: column;
    gap: 12px;
    padding-left: 0;
    height: auto;
  }
`

const InquireText = styled.div`
  color: ${colors.gray600};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

const Mail = styled.a`
  text-decoration: none;
  color: ${colors.gray600};

  &:hover {
    color: white;
    background-color: gray;
    transition: 0.5s ease;
  }
`
