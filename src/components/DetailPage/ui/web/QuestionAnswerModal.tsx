import { GetQnaListResponse } from '@api/types.ts'
import ModalReference from '@components/modal/ModalReference.tsx'
import styled from '@emotion/styled'
import { QuestionCard } from '@components/DetailPage/ui/web/QuestionCard.tsx'
import { useState } from 'react'
import { DebouncedButton } from '@components/button'

type QuestionAnswerModalProps = {
  question: GetQnaListResponse
  setAnswerModalClose: () => void
}

export function QuestionAnswerModal({ question, setAnswerModalClose }: QuestionAnswerModalProps) {
  const [answerText, setAnswerText] = useState<string>('')

  // 답변글 등록
  const handleAnswerTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 500) {
      setAnswerText(event.target.value)
    }
  }

  const handleAnswerButtonClick = () => {}

  return (
    <CommonGuideModalContainer>
      <ModalReference.Header onClickClose={setAnswerModalClose} />
      <CommonGuideModalBody>
        <QuestionCardCustom question={question} />
        <QuestionArea className="QuestionAreaBox">
          <QuestionTextField value={answerText} onChange={handleAnswerTextChange} placeholder="댓글을 입력해주세요." />
          <QuestionOption>
            <QuestionFieldLength>
              글자수: (<span>{answerText.length}</span> / 500)
            </QuestionFieldLength>
          </QuestionOption>
        </QuestionArea>
        <DebouncedButton
          text={'등록'}
          onClick={() => handleAnswerButtonClick()}
          variant="contained"
          sx={{
            height: '40px',
            fontSize: '18px',
            fontWeight: '700',
            borderRadius: '10px',
            color: 'white',
            backgroundColor: '#3ecdba',
            alignSelf: 'end',
          }}
        />
      </CommonGuideModalBody>
    </CommonGuideModalContainer>
  )
}

const QuestionCardCustom = styled(QuestionCard)``

const CommonGuideModalContainer = styled(ModalReference)`
  width: 1075px;
`

// @todo CSS Props 관련하여 확인 필요
const CommonGuideModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;

  padding: 0 20px 40px;

  .qna-card {
    width: 100%;
  }
`

const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #eaebed;
  background: #ffffff;
  padding: 24px 24px 0;

  @media (max-width: 767px) {
    padding: 14px;
    border-width: 0 0 0 0;
  }
`

const QuestionTextField = styled.textarea`
  // element 디자인 요소소
  width: 100%;
  min-height: 150px;
  resize: none;
  background: transparent;
  border-width: 0 0 0 0;
  border-bottom: 1px solid #eaebed;

  // focus 시, 기본 디자인이 노출되는 사항 비활성화
  outline: none !important;
  box-shadow: none !important;

  // element 폰트 요소
  color: #9b9ea2;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  @media (max-width: 767px) {
    border-width: 0 0 0 0;
  }
`

const QuestionOption = styled.div`
  width: 100%;
  margin: 24px 0;
  display: flex;
  justify-content: space-between;
`

const QuestionFieldLength = styled.div`
  color: #9b9ea2;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  span {
    color: #3ecdba;
  }
`
