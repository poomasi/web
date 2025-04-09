import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive'

export function Footer() {
  const siteInfoTextList = ['사업자정보확인', '웹사이트 이용약관', '개인정보 처리방침']
  return (
    <FooterContainer>
      <FooterWrapper>
        <InquireText>
          기타 문의 : <Mail href="mailto://poomasiofficial@gmail.com">poomasiofficial@gmail.com</Mail>
        </InquireText>
        <SiteInfoList>
          {siteInfoTextList.map((siteInfo) => {
            return <SiteInfo key={siteInfo}>{siteInfo}</SiteInfo>
          })}
        </SiteInfoList>
      </FooterWrapper>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  width: 100%;
  border-top: 1px solid #eaebed;
  @media (max-width: 767px) {
    padding: ${getMobileVw(20)};
  }
`

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    font-size: 10px;
    flex-direction: column;
    gap: 12px;
  }
`

const InquireText = styled.div`
  color: #4e5053;
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

  &:hover {
    color: white;
    background-color: gray;
    transition: 0.5s ease;
  }
`

const SiteInfoList = styled.div`
  display: flex;
  justify-content: right;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`

const SiteInfo = styled.div`
  color: #4e5053;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  @media (max-width: 767px) {
    font-size: 12px;
  }

  &:not(:last-child) {
    position: relative;
    padding-right: 10px;
    margin-right: 10px;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      height: 12px; // 원하는 높이로 조정
      width: 1px;
      background-color: #4e5053;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`
