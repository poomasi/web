import { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material'

interface DebouncedButtonProps {
  text: string
  onClick: () => void
  variant?: string
  sx?: SxProps<Theme>
  disabled?: boolean
}

export const DebouncedButton = ({ text, onClick, variant, sx, disabled }: DebouncedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const clickObservable = fromEvent(buttonRef.current, 'click').pipe(debounceTime(500))

    const subscription = clickObservable.subscribe(() => {
      onClick()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [onClick])

  return (
    <Button ref={buttonRef} variant={variant as 'text' | 'outlined' | 'contained'} sx={sx} disabled={disabled}>
      {text}
    </Button>
  )
}
