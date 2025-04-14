import { isErrorToastOpenState, isSuccessToastOpenState } from '@store/toast/toast-state-store'
import { useEffect } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'

// export const useToastClear: Function = (): void => {     ESLint 규칙에서 에러남,Function 타입은 너무 포괄적이기때문
export const useToastClear = (): void => {
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)

  useEffect(() => {
    setIsErrorToastOpen(false)
    setIsSuccessToastOpen(false)
  })
}

/* 토스트(Toast) 
= 잠깐 나타났다 사라지는 알림 메시지

alert을 써도 될텐데 왜 토스트를 사용할까?
>팝업은 사용자가 직접 닫아야 하지만, 토스트는 자동으로 사라짐. > 굳
*/

/*
useSetRecoilState(): Recoil의 atom을 업데이트할 때 사용하면, 해당 상태를 업데이트하는 함수를 반환해줌.
SetterOrUpdater<T>: Recoil에서 상태를 업데이트하는 함수의 타입을 정함

🤔 바로 타입정해주면되는데 왜 SetterOrUpdater을 쓰는걸까?
1️⃣ useSetRecoilState가 반환하는 값이 SetterOrUpdater<T> 타입이기 때문
2️⃣ SetterOrUpdater<T>를 사용하면 (prev => !prev)함수 형태의 업데이트도 처리 가능
*/
