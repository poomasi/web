import { useEffect, useState } from 'react'
import { AccountListResponse } from '@api/types.ts'
import { RequestApi } from '@api/request-api.ts'

export function useProfileList() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [accountList, setAccountList] = useState<AccountListResponse[]>([])
  const [badgeList, setBadgeList] = useState<string[]>([])

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

  const accontBadgeList = () => {
    if (accountList.length > 0) {
      const uniqueFields = new Set(accountList.filter((account) => account.field).map((account) => account.field))
      setBadgeList(Array.from(uniqueFields))
    }
  }

  useEffect(() => {
    dataFetch()
  }, [])

  useEffect(() => {
    accontBadgeList()
  }, [accountList])

  return {
    selectedField,
    accountList,
    handleClickBadge,
    badgeList,
  }
}
