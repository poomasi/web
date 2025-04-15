import styled from '@emotion/styled'

export const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <CloseBtn onClick={onClick}>
      <img src="/assets/images/close.svg" alt="closebutton" />
    </CloseBtn>
  )
}

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`
