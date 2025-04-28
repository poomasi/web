import { AskerSpecificType, CareerYearType } from '@api/enums.ts'
import { DebouncedButton } from '@components/button'
import { useCallback, useState } from 'react'
import { useToastMessageStore } from '@store/toast'
import { useAccountStore } from '@store/account'
import { RequestApi } from '@api/request-api.ts'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive'
import optionCheck from '@assets/images/option-check.svg'
import { colors } from '@styles/foundation/color'
import { useMobileStore } from '@store/useMobileStore.ts'
import { useKeyboardHeight } from '@components/DetailPage/model/hooks/usekeyboardHeight'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'

const QUESTION_MAX_LENGTH: number = 500

export function QuestionField() {
  const { isMobile } = useMobileStore()
  const keyboardHeight = useKeyboardHeight(isMobile)
  const { id } = useParams()
  const { setSuccessToastMessage, setErrorToastMessage } = useToastMessageStore()
  const { accountToken } = useAccountStore()
  const { setIsQuestionListFetched } = useDetailPageContext()
  const [questionText, setQuestionText] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.ACADEMIC)
  const [isMajor, setIsMajor] = useState<boolean>(true)

  //질문글 등록
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value)
    }
  }
  //비밀 질문 여부 체크
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev)
  }

  //개발 경력 필터
  const handleExperienceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCareerYear(event.target.value as CareerYearType)
  }

  //전공 여부 체크
  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsMajor(event.target.value === AskerSpecificType.SPECIALTY)
  }

  // Tanstack Query의 useMutation을 사용하면, API 요청을 더 간편하게 처리할 수 있습니다.
  const postingQuestion = async () => {
    try {
      //질문 데이터를 서버에 등록
      await RequestApi.posts.postQna({ id, isSecret, careerYear, isMajor, questionText })

      //질문 등록 후, 리셋
      setQuestionText('')
      setIsSecret(false)
      setCareerYear(CareerYearType.ACADEMIC)
      setIsMajor(true)

      setTimeout(() => {
        setSuccessToastMessage('질문이 등록되었습니다.')
        setIsQuestionListFetched(true)
      }, 1300)

      //질문 목록 불러오기
      /*const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
			setQnas(qnas.data) // UI에 반영*/
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('질문 등록에 실패했습니다!', error)
      }

      setErrorToastMessage('질문 등록에 실패했습니다!')
    }
  }

  // 팁 !
  // function 재랜더링 되지 않도록 함.
  // 관련하여, 오버 엔지리어닝이 되는 경우도 있다하니 관련 내용은 고민해보도록 하겠습니다.
  const handleQuestionButtonClick = useCallback(async () => {
    if (!accountToken) {
      setErrorToastMessage('질문하려면 로그인이 필수입니다!')
      return
    }

    if (questionText.length < 10) {
      setErrorToastMessage('질문은 10자 이상이어야 합니다!')
      return
    }

    // 질문 등록
    await postingQuestion()
  }, [accountToken, questionText])

  return (
    <QuestionSection className="QuestionSection">
      <QuestionFieldTitle>질문하기</QuestionFieldTitle>
      <AskerInfo>
        <SelectContainer>
          <SelectTitle htmlFor="career-select">개발 경력</SelectTitle>
          <StyledSelect id="career-select" value={careerYear} onChange={handleExperienceChange}>
            <option value={CareerYearType.ACADEMIC}>대학생</option>
            <option value={CareerYearType.JOB_SEEKER}>취준생</option>
            <option value={CareerYearType.JUNIOR}>신입~3년차</option>
            <option value={CareerYearType.MIDDLE}>3년차 이상</option>
          </StyledSelect>
        </SelectContainer>

        <SelectContainer>
          <SelectTitle>전공 사항</SelectTitle>
          <StyledSelect
            id="specific-type"
            value={isMajor ? AskerSpecificType.SPECIALTY : AskerSpecificType.NONE_SPECIALTY}
            onChange={handleMajorChange}
          >
            <option value={AskerSpecificType.SPECIALTY}>전공자</option>
            <option value={AskerSpecificType.NONE_SPECIALTY}>비전공자</option>
          </StyledSelect>
        </SelectContainer>
      </AskerInfo>

      <QuestionArea className="QuestionAreaBox">
        <QuestionTextField
          value={questionText}
          onChange={handleQuestionTextChange}
          placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
        />
        <QuestionOption>
          <QuestionFieldLength>
            글자수: (<span>{questionText.length}</span> / 500)
          </QuestionFieldLength>

          <QuestionSecretOption onClick={handleIsSecretChange}>
            <QuestionCheckbox>{isSecret && <img src={optionCheck} />}</QuestionCheckbox>
            <span>비밀질문</span>
          </QuestionSecretOption>
        </QuestionOption>
      </QuestionArea>

      <QuestionBtnWrapper keyboardHeight={keyboardHeight} style={{ marginLeft: 'auto' }}>
        <DebouncedButton
          text={'질문 등록하기'}
          onClick={() => handleQuestionButtonClick()}
          variant="contained"
          sx={{
            height: '60px',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '150%',
            padding: '0 20px',
            borderRadius: '10px',
            color: 'white',
            backgroundColor: '#3ecdba',
            '@media (max-width:767px)': {
              bottom: `${keyboardHeight + 16}px`,
            },
          }}
        />
      </QuestionBtnWrapper>
    </QuestionSection>
  )
}

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    margin-bottom: ${getMobileVw(40)};
    paddingbottom: 40px;
  }
`

const QuestionFieldTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  @media (max-width: 767px) {
    font-size: 1.125rem;
  }
`

const AskerInfo = styled.div`
  display: flex;
`

const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #eaebed;
  background: #f7f7f7;
  padding: 1.5rem 32px;

  @media (max-width: 767px) {
    padding: 14px;
    border-width: 0 0 0 0;
  }
`

const QuestionTextField = styled.textarea`
  // element 디자인 요소소
  width: 100%;
  min-height: 270px;
  resize: none;
  background: transparent;

  // focus 시, 기본 디자인이 노출되는 사항 비활성화
  outline: none !important;
  box-shadow: none !important;
  border-bottom: 1px solid #eaebed;

  // element 폰트 요소
  color: #9b9ea2;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  @media (max-width: 767px) {
    border-width: 0 0 0 0;
  }
`

const QuestionOption = styled.div`
  width: 100%;
  margin: 24px 0 0;
  display: flex;
  justify-content: space-between;
`

const QuestionFieldLength = styled.div`
  color: #9b9ea2;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  span {
    color: #3ecdba;
  }
`

const QuestionSecretOption = styled.div`
  display: flex;
  gap: 8px;
  color: ${colors.gray500};
  align-items: center;
`

const QuestionCheckbox = styled.div`
  width: 24px;
  height: 24px;

  border-radius: 5px;
  border: 1px solid #c5c8cd;
  background: #ffffff;
`

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 15px;
  padding: 8px 12px;
  border-radius: 100px;
  border: 1px solid #c5c8cd;
  background: #fff;
`

const SelectTitle = styled.label`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.gray800};
  white-space: nowrap;
  cursor: pointer; // 커서 포인터 추가
  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`

// 스타일링 수정:
const StyledSelect = styled.select`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  text-align: center;

  /* flex 대신 inline-block 사용 */
  display: inline-block;
  padding-right: 10px;

  /* 다른 속성들은 유지 */
  color: #3ecdba;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  height: 24px;
  padding-top: 3px;

  &:focus {
    outline: none;
  }

  option {
    color: black;
  }

  @media (max-width: 767px) {
    font-size: 0.75rem;
    padding-top: 0;
    padding-right: 0;
  }
`

const QuestionBtnWrapper = styled.div<{ keyboardHeight: number }>`
  margin-left: auto;

  /* @media (max-width: 767px) {
    position: fixed;
    bottom: ${({ keyboardHeight }) => `${keyboardHeight + 16}px`};
    left: 0;
    width: 100%;
    padding: 0 16px;
    z-index: 999;
    transition: bottom 0.3s ease;
  } */
`
