import { useEffect, useState } from 'react'
import { AccountListResponse } from '@api/types.ts'
import { RequestApi } from '@api/request-api.ts'

export function useProfileList() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [accountList, setAccountList] = useState<AccountListResponse[]>([])
  const badgeList = ['Web Frontend', 'Backend', 'Fullstack', 'Android', 'iOS', 'Data']

  const handleClickBadge = (word: string | null) => {
    setSelectedField(word)
  }

  const dataFetch = async () => {
    try {
      const response = await RequestApi.accounts.getAccountList()
      setAccountList(Array.isArray(response) ? response : [])
    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error)
      setAccountList([])
    }
  }

  useEffect(() => {
    dataFetch()
  }, [])

  return {
    selectedField,
    accountList,
    handleClickBadge,
    badgeList,
  }
}
