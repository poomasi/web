import ModalReference from '@components/modal/ModalReference.tsx'
import styled from '@emotion/styled'

type CommonGuideModalProps = {
  title: string
  content: string
  onCloseClick: () => void
}

export function CommonGuideModal({ title, content, onCloseClick }: CommonGuideModalProps) {
  return (
    <CommonGuideModalContainer onClick={onCloseClick}>
      <ModalReference.Header onClickClose={onCloseClick} />
      <CommonGuideModalBody>
        <GuideTitle>{title}</GuideTitle>
        <GuideInfoText>{content}</GuideInfoText>
      </CommonGuideModalBody>
    </CommonGuideModalContainer>
  )
}

const CommonGuideModalContainer = styled(ModalReference)`
  width: 1075px;
`

const CommonGuideModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;

  padding-bottom: 70px;
`

const GuideTitle = styled.div`
  color: #0e0e0e;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
`

const GuideInfoText = styled.div`
  width: 100%;
  padding: 40px 0;
  background-color: #f7f7f7;
  border-radius: 16px;

  color: #28292a;
  text-align: center;
  /* 줄바꿈 적용 */
  white-space: pre-line;

  /* Web/Body XL/Medium */
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 33px */
`
