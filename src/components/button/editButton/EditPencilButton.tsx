import styled from '@emotion/styled'
import editPensil from '@assets/images/pensil.svg'

interface EditPensilButtonProps {
  isEditing: boolean
  onClick: () => void
  loading?: boolean
}

export function EditPencilButton({ isEditing, onClick, loading }: EditPensilButtonProps) {
  return (
    <Wrapper onClick={onClick} disabled={loading}>
      <EditPensilBtn src={editPensil} alt="수정하기" />
      <EditAction>{isEditing ? '저장' : '수정'}</EditAction>
    </Wrapper>
  )
}

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
`

const EditPensilBtn = styled.img`
  cursor: pointer;
  margin-right: 8px;
`

const EditAction = styled.div`
  font-size: 14px;
  color: #777;
  cursor: pointer;
`
