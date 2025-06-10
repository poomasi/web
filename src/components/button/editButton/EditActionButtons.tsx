// components/DetailPage/ui/web/EditActionButtons.tsx
import styled from '@emotion/styled'
import { QuestionAnswerButton } from '@components/DetailPage/ui/web/QuestionList'

type Props = {
  onSave: () => void
  onCancel: () => void
}

export function EditActionButtons({ onSave, onCancel }: Props) {
  return (
    <ButtonWrapper>
      <QuestionAnswerButton style={{ display: 'flex' }} onClick={onSave}>
        저장
      </QuestionAnswerButton>
      <QuestionAnswerButton style={{ display: 'flex' }} onClick={onCancel}>
        취소
      </QuestionAnswerButton>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`
