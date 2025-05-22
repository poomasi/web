// components/DetailPage/ui/web/EditButton.tsx
import styled from '@emotion/styled'
import editDots from '@assets/images/edit-dots.svg'

type EditButtonProps = {
  onToggle: () => void
  onEditClick: () => void
  showEditBtn: boolean
}

export function EditButton({ onToggle, onEditClick, showEditBtn }: EditButtonProps) {
  return (
    <Wrapper>
      <DotMenu src={editDots} alt="더보기" onClick={onToggle} />
      {showEditBtn && <EditAction onClick={onEditClick}>수정</EditAction>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
`

const DotMenu = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  user-select: none;
`

const EditAction = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.5rem;
  margin-top: 12px;
  padding: 16px 72px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 22px;
  cursor: pointer;
  color: #0e0e0e;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3ecdba;
    color: white;
  }
`
