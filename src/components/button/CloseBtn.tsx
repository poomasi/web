import styled from '@emotion/styled'

export const CloseButton = () => {
  return (
    <CloseBtn>
      <img src="/assets/images/close.svg" alt="closebutton" />
    </CloseBtn>
  )
}

const CloseBtn = styled.button`
  width: 10px;
  height: 10px;
  cursor: pointer;
`
