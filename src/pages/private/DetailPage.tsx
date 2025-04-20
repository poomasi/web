import { useToastClear } from '@hooks/use-toast-clear.ts'
import { errorToastMessageState, isErrorToastOpenState, publicIdState } from '@store/index.ts'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { RequestApi } from '@api/index.ts'
import { useEffect } from 'react'
import { TeacherIntroduce } from '@components/DetailPage/ui/web/TeacherIntroduce.tsx'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { QuestionField } from '@components/DetailPage/ui/web/QuestionField.tsx'
import { QuestionList } from '@components/DetailPage/ui/web/QuestionList.tsx'

export function DetailPage() {
  useToastClear()
  const publicId: string | null = useRecoilValue(publicIdState)
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)

  const navigate = useNavigate()
  const { id } = useParams()
  const { pageLoading, setTeacherAccount, setPageLoading } = useDetailPageContext()

  // 품앗이꾼 데이터 가져오는 API
  const getTeacherData = async () => {
    if (id === undefined) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('잘못된 접근입니다.')
      navigate('/')
      return
    }

    try {
      const account = await RequestApi.accounts.getAccount(id)
      setTeacherAccount(account.data)
      setPageLoading(true)
    } catch (error: unknown) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('품앗이꾼 정보를 가져오는 데 실패했습니다.')
      navigate('/')
    }
  }

  useEffect(() => {
    if (publicId === null) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('로그인을 먼저 진행해주세요.')
      navigate('/')
    }

    scroll(0, 0)
    getTeacherData()
  }, [])

  return (
    <Container>
      <PageContainer>
        <PageContent>
          {!pageLoading ? (
            <>Loading...</>
          ) : (
            <>
              <TeacherIntroduce />

              <Seperator />

              <QuestionField />

              <QuestionList />
            </>
          )}
        </PageContent>
      </PageContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;

  padding-top: 80px;
`
const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 5% 0 5%;
  /* background-color: pink; */
`
const PageContent = styled.div`
  width: 1200px;
  margin-bottom: 50px;
`
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 3px var(--light-gray-color) dashed;
  margin-top: 30px;
`
