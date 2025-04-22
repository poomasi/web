import { useEffect } from 'react'
import { useAccountStore } from '@store/account'

export function TestLoginBypass() {
  const { setAccountToken, setPublicId } = useAccountStore()

  useEffect(() => {
    setAccountToken('dummy.jwt.token')
    setPublicId('test-user-id')
  }, [])

  return null
}
