import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { CareerYearType } from '@api/enums.ts'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { DebouncedButton } from '@components/button'
import { useCallback, useState } from 'react'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  errorToastMessageState,
  isErrorToastOpenState,
  isSuccessToastOpenState,
  successToastMessageState
} from '@store/toast'
import { accountTokenState } from '@store/account'
import { RequestApi } from '@api/request-api.ts'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'

const QUESTION_MAX_LENGTH: number = 500

export function QuestionField() {
  const { id } = useParams()
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState)
  const accountToken: string | null = useRecoilValue(accountTokenState)
  const [questionText, setQuestionText] = useState<string>('')

  const [isSecret, setIsSecret] = useState<boolean>(false)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.대학생)
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

  // Tanstack Query의 useMutation을 사용하면, API 요청을 더 간편하게 처리할 수 있습니다.
  const postingQuestion = async () => {
    try {
      //질문 데이터를 서버에 등록
      await RequestApi.posts.postQna({ id, isSecret, careerYear, isMajor, questionText })

      //질문 등록 후, 리셋
      setQuestionText('')
      setIsSecret(false)
      setCareerYear(CareerYearType.대학생)
      setIsMajor(true)

      setTimeout(() => {
        setIsSuccessToastOpen(true)
        setSuccessToastMessage('질문이 등록되었습니다.')
      }, 1300)

      //질문 목록 불러오기
      /*const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
      setQnas(qnas.data) // UI에 반영*/
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('질문 등록에 실패했습니다!', error)
      }

      setIsErrorToastOpen(true)
      setErrorToastMessage('질문 등록에 실패했습니다!')
    }
  }

  // 팁 !
  // function 재랜더링 되지 않도록 함.
  // 관련하여, 오버 엔지리어닝이 되는 경우도 있다하니 관련 내용은 고민해보도록 하겠습니다.
  const handleQuestionButtonClick = useCallback(async () => {
    if (!accountToken) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('질문하려면 로그인이 필수입니다!')
      return
    }

    if (questionText.length < 10) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('질문은 10자 이상이어야 합니다!')
      return
    }

    // 질문 등록
    await postingQuestion()
  }, [])


  return (
    <QuestionBody>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>질문하기</div>
          {questionText.length === 500 ? (
            <div
              style={{
                fontSize: '16px',
                marginLeft: '3px',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                color: 'red'
              }}
            >
              {`(${questionText.length} / 500)`}
            </div>
          ) : (
            <div
              style={{
                fontSize: '16px',
                marginLeft: '3px',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--gray-color)'
              }}
            >
              {`(${questionText.length} / 500)`}
            </div>
          )}
        </div>
        <FormControlLabel
          style={{ margin: '0' }}
          control={<Switch checked={isSecret} onChange={handleIsSecretChange} />}
          label="비밀 질문"
        />
      </div>

      <QuestionArea
        value={questionText}
        /*
        에러:'(event: React.ChangeEvent<HTMLInputElement>) => void' 형식은 'ChangeEventHandler<HTMLTextAreaElement>' 형식에 할당할 수 없습니다.
        */
        onChange={handleQuestionTextChange}
        placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
      />

      <div style={{ marginTop: '7px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              개발 경력
            </InputLabel>
            <NativeSelect value={careerYear} onChange={handleExperienceChange}>
              <option value={CareerYearType.대학생}>대학생</option>
              <option value={CareerYearType.취준생}>취준생</option>
              <option value={CareerYearType.신입_3년차}>신입~3년차</option>
              <option value={CareerYearType._3년차_이상}>3년차 이상</option>
            </NativeSelect>
          </FormControl>

          <RadioGroup row style={{ marginLeft: '7px' }}>
            <FormControlLabel
              value="전공"
              control={<Radio size="small" checked={isMajor} onChange={() => setIsMajor(true)} />}
              label="전공"
            />
            <FormControlLabel
              value="비전공"
              control={<Radio size="small" checked={!isMajor} onChange={() => setIsMajor(false)} />}
              label="비전공"
            />
          </RadioGroup>
        </div>

        <DebouncedButton
          text={'등록'}
          onClick={() => handleQuestionButtonClick()}
          variant="contained"
          sx={{
            width: '60px',
            height: '40px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '10px',
            color: 'white'
          }}
        />
      </div>
    </QuestionBody>
  )
}


const QuestionBody = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 300px;
    /* background-color: greenyellow; */
`

const QuestionArea = styled.textarea`
    outline-color: #1976d2;
    font-size: 16px;
    margin-top: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    border-radius: 10px;
    resize: none;
    padding: 20px;

    @media (max-width: 520px) {
        font-size: 15px;
        height: 40%;
    }
    /* background-color: green; */
`