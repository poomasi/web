import { useAccountStore, useToastMessageStore } from '@store/index.ts'

import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { RequestApi } from '@api/index.ts'
import { useEffect, useState } from 'react'
import { TeacherIntroduce } from '@components/DetailPage/ui/web/TeacherIntroduce.tsx'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { QuestionField } from '@components/DetailPage/ui/web/QuestionField.tsx'
import { QuestionList } from '@components/DetailPage/ui/web/QuestionList.tsx'
import { MobileDetailPage } from '@pages/private/MobileDetailPage'
import { useMobileStore } from '@store/useMobileStore.ts'

export function DetailPage() {
  const { publicId, accountType } = useAccountStore()
  const { setErrorToastMessage } = useToastMessageStore()
  const [isAnswerAuthority, setIsAnswerAuthority] = useState<boolean>(false)

  const navigate = useNavigate()
  const { id } = useParams()
  const { pageLoading, setTeacherAccount, setPageLoading, teacherAccount } = useDetailPageContext()

  // 품앗이꾼 데이터 가져오는 API
  const getTeacherData = async () => {
    if (id === undefined) {
      setErrorToastMessage('잘못된 접근입니다.')
      navigate('/')
      return
    }

    try {
      const account = await RequestApi.accounts.getAccount(id)
      setTeacherAccount(account.data)
      setPageLoading(true)
    } catch (error: unknown) {
      setErrorToastMessage('품앗이꾼 정보를 가져오는 데 실패했습니다.')
      navigate('/')
    }
  }

  useEffect(() => {
    if (publicId === null) {
      setErrorToastMessage('로그인을 먼저 진행해주세요.')
      navigate('/')
    }

    scroll(0, 0)
    getTeacherData()
  }, [])

  useEffect(() => {
    if (teacherAccount) {
      setIsAnswerAuthority(teacherAccount.public_id === publicId && accountType === 'ADMIN')
    }
  }, [teacherAccount])

  const { isMobile } = useMobileStore()

  return isMobile ? (
    <MobileDetailPage />
  ) : (
    <Container>
      <PageContainer>
        <PageContent>
          {!pageLoading ? (
            <>Loading...</>
          ) : (
            <>
              <TeacherIntroduce />

              <Seperator />

              {!isAnswerAuthority && <QuestionField />}

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

  @media (max-width: 1024px) {
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
  width: 1320px;
  margin-bottom: 50px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 1px solid #eaebed;
  margin-top: 30px;

  @media (max-width: 1024px) {
    height: 1px;
    border-top: 1px solid #eaebed;
  }
`
