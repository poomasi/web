import styled from '@emotion/styled'
import editPensil from '@assets/images/pensil.svg'
import { useState } from 'react'

type EditPensilButtonProps = {
  onToggle: () => void
  onEditClick: () => void
  // showEditBtn: boolean
}

export function EditPensilButton({ onToggle, onEditClick }: EditPensilButtonProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleClick = () => {
    if (isEditing) {
      onEditClick()
    } else {
      onToggle()
    }
    setIsEditing((prev) => !prev)
  }

  return (
    <Wrapper onClick={handleClick}>
      <EditPensilBtn src={editPensil} alt="수정하기" />
      <EditAction>{isEditing ? '저장' : '수정'}</EditAction>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
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
