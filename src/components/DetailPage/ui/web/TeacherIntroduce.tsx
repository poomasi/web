import styled from '@emotion/styled'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import TextareaAutosize from 'react-textarea-autosize'

export function TeacherIntroduce() {
  const { teacherAccount } = useDetailPageContext()

  // 품앗이꾼 데이터 가져오는 API
  /*const getTeacherData = async () => {
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
		getTeacherData()
	}, [])*/

  return (
    <>
      <Header>
        <ProfilePictureWrapper>
          <ProfileImage src={teacherAccount?.profile_image} alt={'profile-image'} />
        </ProfilePictureWrapper>

        <HeaderBody>
          <ProfileSection>
            <HeaderName>{teacherAccount?.name}</HeaderName>
            <HeaderField>{teacherAccount?.field}</HeaderField>
          </ProfileSection>
          <HeaderJob>{'現 ' + teacherAccount?.company1 + ' ' + teacherAccount?.job1}</HeaderJob>
        </HeaderBody>
      </Header>
      <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '20px' }}>품앗이꾼 소개</div>
      <Description readOnly value={teacherAccount?.description} />
    </>
  )
}

const Header = styled.div`
  width: 100%;

  display: flex;
  /* background-color: green; */
`

const ProfilePictureWrapper = styled.div`
  display: flex;

  width: 140px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const ProfileSection = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 520px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  /* background-color: red; */
`

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 30px;
  padding-top: 40px;
  /* background-color: blue; */

  @media (max-width: 520px) {
    padding-top: 0;
    margin-left: 13px;
  }
`
const HeaderName = styled.div`
  font-weight: bold;
  font-size: 40px;

  @media (max-width: 520px) {
    font-size: 30px;
  }
`
const HeaderField = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size: 30px;
  color: var(--gray-color);

  @media (max-width: 520px) {
    margin-left: 0;
    font-size: 23px;
  }
`
const HeaderJob = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--light-gray-color);
  @media (max-width: 520px) {
    font-size: 16px;
  }

  // iphone mini
  @media (max-width: 380px) {
    font-size: 15px;
  }
`

const Description = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  border: none;
  outline: none;
  resize: none;
  font-size: 17px;
  padding: 0;

  @media (max-width: 520px) {
    font-size: 14px;
  }
  /* background-color: green; */
`
