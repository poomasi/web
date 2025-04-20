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

  const getTeacherData = async () => {
    try {
      console.log('시도함')
      const account = await RequestApi.accounts.getAccount(id)
      setTeacherAccount(account.data)
      setPageLoading(true)
      console.log('성공 !')
    } catch (error: unknown) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('품앗이꾼 정보를 가져오는 데 실패했습니다.')
      navigate('/')
    }
  }

  useEffect(() => {
    if (publicId === null) {
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
  @media (max-width: 767px) {
    padding-top: 0;
  }
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
  @media (max-width: 767px) {
    width: 100%;
  }
`
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 3px var(--light-gray-color) dashed;
  margin-top: 30px;

  @media (max-width: 767px) {
    height: 1px;
    border-top: 1px solid #eaebed;
  }
`
