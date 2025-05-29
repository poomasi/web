import styled from '@emotion/styled'

interface Props {
  value: string
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function MentoDescriptionArea({ value, isEditing, onChange }: Props) {
  if (isEditing) {
    return <StyledTextarea value={value} onChange={onChange} placeholder="자기소개를 입력하세요." autoFocus />
  }

  return <DescriptionBox>{value && value.trim() !== '' ? value : '아직 작성된 소개가 없습니다.'}</DescriptionBox>
}

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  height: auto;
  border: 1px solid #dadce0;
  /* background: #f6f6f6; */
  resize: none;
  padding: 16px;
  margin-top: 12px;
  font-size: 1.1rem;
  border-radius: 10px;
  outline: none;
  font-family: inherit;

  &:read-only {
    cursor: default;
  }

  @media (max-width: 1024px) {
    min-height: 100px;
    margin-top: 30px;
  }
`
const DescriptionBox = styled.div`
  width: 100%;
  min-height: 300px;
  /* background: #f6f6f6; */
  padding: 16px;
  margin-top: 12px;
  font-size: 1.1rem;
  border-radius: 10px;
  color: #333;
  white-space: pre-wrap; // 줄바꿈 반영
  font-family: inherit;
  display: flex;
  align-items: flex-start;

  @media (max-width: 1024px) {
    min-height: 100px;
  }
`
