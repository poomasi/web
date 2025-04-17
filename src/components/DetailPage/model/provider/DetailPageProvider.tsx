import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { AccountResponse } from '@api/types.ts'


interface DetailPageProviderProps {
  teacherAccount: AccountResponse | null;
  setTeacherAccount: (accountRes: AccountResponse) => void;
}

const DetailPageContext = createContext<DetailPageProviderProps>({
  teacherAccount: null,
  setTeacherAccount: () => {
  }
})

export function DetailPageContextProvider({ children }: PropsWithChildren) {
  const [account, setAccount] = useState<AccountResponse | null>(null)

  const providerValue: DetailPageProviderProps = {
    teacherAccount: account,
    setTeacherAccount: (accountRes: AccountResponse) => {
      setAccount(accountRes)
    }
  }

  return (
    <DetailPageContext.Provider value={providerValue}>
      {children}
    </DetailPageContext.Provider>
  )

}

export function useDetailPageContext() {
  const context = useContext(DetailPageContext)
  if (context === undefined) {
    throw new Error('useDetailPageContext 는 DetailPageContextProvider 안에서만 사용 가능합니다.')
  }
  return context
}
