import { useRef } from 'react'
import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material'

interface DebouncedButtonProps {
  text: string
  onClick: () => Promise<void>
  variant?: string
  sx?: SxProps<Theme>
  disabled?: boolean
}

export const DebouncedButton = ({ text, onClick, variant, sx, disabled }: DebouncedButtonProps) => {
  const clickEventRef = useRef<boolean>(false)

  const handleButtonClick = async () => {
    // 클릭 이벤트 실행 중인 경우, return
    if (clickEventRef.current) return
    // 클릭 이벤트 pending 임의 구현
    clickEventRef.current = true

    try {
      await onClick() //await은 Promise를 기다리는 역할을 하고, async 함수 안에서만 쓸 수 있다.
    } catch {
      // 에러 처리가 필요하진 않을 것 같으나 참고만 부탁드립니다.
    } finally {
      // 클릭 이벤트 완료 후 0.5 초 뒤에 실행할 수 있도록 함
      setTimeout(() => {
        clickEventRef.current = false
      }, 1000 * 0.5)
    }
  }

  return (
    <Button variant={variant as 'text' | 'outlined' | 'contained'} sx={sx} disabled={disabled} onClick={handleButtonClick}>
      {text}
    </Button>
  )
}
