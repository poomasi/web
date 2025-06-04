import { useState } from 'react'

export function useCloseBtn() {
  const [isClosed, setIsClosed] = useState(false)

  const handleClose = () => {
    setIsClosed(true)
  }

  return {
    isClosed,
    setIsClosed,
    handleClose,
  }
}
