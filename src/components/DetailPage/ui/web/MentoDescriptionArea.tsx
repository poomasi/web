import styled from '@emotion/styled'

interface Props {
  value: string
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function MentoDescriptionArea({ value, isEditing, onChange }: Props) {
  return <StyledTextarea value={value} readOnly={!isEditing ? true : undefined} onChange={onChange} />
}

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  border: none;
  background: #f6f6f6;
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
`
