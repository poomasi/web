import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { AccountResponse } from '@api/types.ts'

interface DetailPageProviderProps {
  teacherAccount: AccountResponse | null
  setTeacherAccount: (accountRes: AccountResponse) => void
  pageLoading: boolean
  setPageLoading: (loading: boolean) => void
  isQuestionListFetched: boolean
  setIsQuestionListFetched: (isFetched: boolean) => void
}

const DetailPageContext = createContext<DetailPageProviderProps>({
  teacherAccount: null,
  setTeacherAccount: () => {},
  pageLoading: false,
  setPageLoading: () => {},
  isQuestionListFetched: false,
  setIsQuestionListFetched: () => {},
})

export function DetailPageContextProvider({ children }: PropsWithChildren) {
  const [account, setAccount] = useState<AccountResponse | null>(null)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [isQuestionListFetched, setIsQuestionListFetched] = useState<boolean>(false)

  const providerValue: DetailPageProviderProps = {
    teacherAccount: account,
    setTeacherAccount: (accountRes: AccountResponse) => {
      setAccount(accountRes)
    },
    pageLoading,
    setPageLoading,
    isQuestionListFetched,
    setIsQuestionListFetched,
  }

  return <DetailPageContext.Provider value={providerValue}>{children}</DetailPageContext.Provider>
}

export function useDetailPageContext() {
  const context = useContext(DetailPageContext)
  if (context === undefined) {
    throw new Error('useDetailPageContext 는 DetailPageContextProvider 안에서만 사용 가능합니다.')
  }
  return context
}
