import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import { ProfileCard } from '@pages/public/ProfileCard'
import { Badge } from '@components/badge'
import { useEffect, useState } from 'react'
import { RequestApi } from '@api/request-api'
import { AccountListResponse } from '@api/types'

export function ProfilesSection() {
  const [selectedField, setSelectedField] = useState<string>('전체')
  const [accountList, setAccountList] = useState<AccountListResponse[]>([])

  const handleClickBadge = (word: string) => {
    setSelectedField(word)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const response = await RequestApi.accounts.getAccountList()

        console.log('API 응답 데이터:', response)

        if (response.length > 0) {
          console.log('첫 번째 데이터 구조:', response[0])
        }

        setAccountList(Array.isArray(response) ? response : [])
      } catch (error) {
        console.error('데이터 로드 중 오류 발생:', error)
        setAccountList([])
      }
      // setAccountList(await RequestApi.accounts.getAccountList())
    })()
  }, [])

  return (
    <Container>
      <Seperator />
      <SubHead>품앗이꾼</SubHead>

      <BadgeContainer>
        <Badge onClick={() => handleClickBadge('전체')} word={'전체'} />
        <Badge onClick={() => handleClickBadge('Web Frontend')} word={'Web Frontend'} />
        <Badge onClick={() => handleClickBadge('Backend')} word={'Backend'} />
        <Badge onClick={() => handleClickBadge('Fullstack')} word={'Fullstack'} />
        <Badge onClick={() => handleClickBadge('Android')} word={'Android'} />
        <Badge onClick={() => handleClickBadge('iOS')} word={'iOS'} />
        <Badge onClick={() => handleClickBadge('Data')} word={'Data'} />
        {/* <Badge onClick={() => handleClickBadge('AI/ML')} word={'AI/ML'} /> */}
      </BadgeContainer>

      <div>
        <PeopleContainer container style={{ margin: '0 auto' }}>
          {accountList
            .filter((account) => selectedField === '전체' || account?.field === selectedField)
            .map((account, index) => (
              <ProfileCard key={account.public_id || index} profileData={account} />
            ))}
        </PeopleContainer>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const Seperator = styled.div`
  height: 4px;
  width: 30px;
  background-color: black;
  margin-top: 7px;
  margin-bottom: 16px;
`
const SubHead = styled.div`
  font-size: 30px;
  margin-bottom: 13px;
`

const BadgeContainer = styled(Grid)`
  width: 100%;
`

const PeopleContainer = styled(Grid)`
  width: 100%;
  display: flex;
`
