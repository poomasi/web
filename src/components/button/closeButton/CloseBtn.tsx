import styled from '@emotion/styled'
import closeIcon from './close-button.svg'
import { getMobileVw } from '@utils/responsive'

type CloseButtonProps = {
  onClick: () => void
  style?: React.CSSProperties
}
// type CloseButtonProps = {
//   onClick: () => void
//   children?: React.ReactNode
// }

export const CloseButton = ({ onClick, style }: CloseButtonProps) => {
  return (
    <CloseBtn onClick={onClick} style={style}>
      <img src={closeIcon} alt="closebutton" />
    </CloseBtn>
  )
}

const CloseBtn = styled.button`
  /* margin-left: ${getMobileVw(300 * 0.9)}; */
  width: 1rem;
  height: 1rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`
