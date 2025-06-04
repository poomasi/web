import { useAccountStore } from '@store/account'

export function useIsOwner(targetPublicId?: string) {
  const { publicId } = useAccountStore()
  return !!targetPublicId && !!publicId && targetPublicId == publicId
}
