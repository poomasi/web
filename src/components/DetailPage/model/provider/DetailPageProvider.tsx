import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { AccountResponse } from '@utils/api/types/account.types'

/*
1. Context는 무엇?
여러 컴포넌트가 공통으로 필요한 데이터를 저장하는 공용 공간이야.
예) 로그인 정보, 언어 설정, 테마 (다크모드 등)

2. useContext(Context)는 뭐해?
특정 context에 접근해서 **저장된 값(value)**을 꺼내오는 함수야.
*/
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

// React 컴포넌트를 감싸는 Provider로 만들기 위해서 필요한 타입
export function DetailPageContextProvider({ children }: PropsWithChildren) {
  const [teacherAccount, setTeacherAccount] = useState<AccountResponse | null>(null)
  const [pageLoading, setPageLoading] = useState<boolean>(false)
  const [isQuestionListFetched, setIsQuestionListFetched] = useState<boolean>(false)

  // Context에 전달할 데이터 모음
  const providerValue: DetailPageProviderProps = {
    teacherAccount,
    setTeacherAccount,
    pageLoading,
    setPageLoading,
    isQuestionListFetched,
    setIsQuestionListFetched,
  }

  return <DetailPageContext.Provider value={providerValue}>{children}</DetailPageContext.Provider>
}

//context를 안전하게 꺼내 쓰기 위한 커스텀 훅
export function useDetailPageContext() {
  const context = useContext(DetailPageContext)
  if (context === undefined) {
    throw new Error('useDetailPageContext 는 DetailPageContextProvider 안에서만 사용 가능합니다.')
  }
  return context
}
