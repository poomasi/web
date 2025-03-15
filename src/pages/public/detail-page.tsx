import { useToastClear } from '@hooks/toast'
import {
  isErrorToastOpenState,
  errorToastMessageState,
  isSuccessToastOpenState,
  successToastMessageState,
  accountTokenState,
  publicIdState,
} from '@store/index'
import { useRecoilValue, useSetRecoilState, SetterOrUpdater } from 'recoil'

import styled from '@emotion/styled'
import TextareaAutosize from 'react-textarea-autosize'
import { useParams } from 'react-router-dom'
import { AccountResponse, CareerYearType, GetQnaListResponse, QnaListType, RequestApi } from '@api/index'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DebouncedButton } from '@components/button'
import { Badge } from '@components/badge'

const QUESTION_MAX_LENGTH: number = 500

const getCareerYearString = (career_year: string) => {
  switch (career_year) {
    case CareerYearType.대학생:
      return '대학생'
    case CareerYearType.취준생:
      return '취준생'
    case CareerYearType.신입_3년차:
      return '신입~3년차'
    case CareerYearType._3년차_이상:
      return '3년차 이상'
    default:
      return '대학생'
  }
}

export function DetailPage() {
  useToastClear()
  const publicId: string | null = useRecoilValue(publicIdState)
  const accountToken: string | null = useRecoilValue(accountTokenState)
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState)

  const navigate = useNavigate()
  const { id } = useParams()
  // const [isLoading, setIsLoading]: [boolean, Function] = useState(false)     ESLint 규칙에서 에러남,Function 타입은 너무 포괄적이기때문, ESLint 규칙..??
  /*
  TypeScript가 자동으로 타입 추론이 가능하지만, useState<T>()를 꼭 사용해야 하는 경우가 있다.
  1. 초기값이 null 또는 undefined인 경우
  2. 배열 또는 객체 상태를 다룰 때
  */
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [account, setAccount] = useState<Array<AccountListResponse> | undefined>(undefined)
  const [qnas, setQnas] = useState<GetQnaListResponse[]>([])
  const [qnaListType, setQnaListType] = useState<QnaListType>(QnaListType.ALL) //타입을 업데이트..? why??

  //Question info
  const [questionText, setQuestionText] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)

  // U(대학생), R(취준생), N(신입~3년차), S(3년차 이상)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.대학생)
  const [isMajor, setIsMajor] = useState<boolean>(true)

  /* ***벨로그에 정리하기***
  에러: 'string' 형식의 인수는 'SetStateAction<QnaListType>' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)
  
  원인: setQnaListType은 QnaListType타입만 받도록 되어있는데, string으로 받으라고 해서.

  해결방법01: word의 값이 ALL이거나 ME이면 string을 QnaListType으로 변환
  
  🔍 설명
  >word는 string을, setQnaListType은 QnaListType 타입을 기대하고 있다.
  >"ALL"과 "ME"가 string이지만, TypeScript는 QnaListType과 string을 다르게 취급함.
  >따라서, string을 QnaListType으로 변환해야 오류가 안 난다.

  의문점: 그럼 변환하는게 아니라 애초에 word를 QnaListType로 정의하면 되는거 아닌가?
  >word의 값이 항상 QnaListType에서 올 경우 이렇게 해도 된다.
  */
  const handleClickBadge = (word: QnaListType) => {
    setQnaListType(word)
  }

  /*
  에러: Unexpected any. Specify a different type. eslint(@typescript-eslint/no-explicit-any)
  
  원인: event의 타입이 any로 설정되어 있어서 TypeScript ESLint에서 경고 발생함

  해결방법: event의 타입을 명확하게 지정하기!
  > input 요소에서 발생하는 이벤트이므로, React.ChangeEvent<HTMLInputElement>로 타입을 지정
  */
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value)
    }
  }
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev)
  }
  /* ***더 공부하기***
  에러: 'string' 형식의 인수는 'SetStateAction<CareerYearType>' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)

  원인: event.target.value는 string 타입인데 setCareerYear은 CareerYearType로 이미 설정해둬서 이걸 기다리고 있기 때문이다.

  🤔의문점: "왜 event.target.value는 string 타입일까? HTMLSelectElement인데?"
  👉 HTMLSelectElement 자체는 여러 속성을 가질 수 있지만, value 속성은 항상 string 타입으로 정의됨.
  👉 HTMLSelectElement의 여러 속성: options, selectedIndex 등..

  
  의문점: 그럼 처음부터 그냥 React.ChangeEvent<HTMLOptionsCollection> 쓰면 안되나?
  >안됌, HTMLOptionsCollection은 <select> 요소 내부의 <option>들을 관리하는 컬렉션 객체, onChange 이벤트의 타입으로 사용할 수 없다....??? 무슨 소리일까..
  */
  const handleCareerYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCareerYear(event.target.value as CareerYearType)
  }
  /*
  const handleIsMajorChange = (e: any, value: boolean) => {
    setIsMajor(value)
  }
  에러: 'e'이(가) 선언은 되었지만 해당 값이 읽히지는 않았습니다.ts(6133)

  원인: e 매개변수를 선언했지만, handleIsMajorChange 함수에서 e를 사용하지 않아서 발생

  의문점01: 왜 사용을 안하지? onChange에서 e받아서 상태 업데이트 해줘야 하는거 아닌가?
  >지금 코드에서는 e.target.value를 읽을 필요가 없기 때문에 e를 생략해도 괜찮습니다.
  >e가 필요한 경우: <input> 같은 요소에서 사용자가 입력한 값을 상태로 저장해야 할 때
  >필요하지 않은 경우: RadioButton, Checkbox처럼 미리 정해진 값으로 상태를 변경할 때

  의문점02: 그래도 이해가 안가는데 handleIsMajorChange 함수에서 왜 e를 사용하지 않은 거지?? 
  1. e(이벤트 객체)는 언제 필요한가?
  일반적으로 e는 사용자가 입력한 값을 읽어야 할 때 필요하다.
  예를 들어, input 필드에서 입력된 텍스트 값을 가져와서 상태를 업데이트하려면 e.target.value가 필요함.
  2. Radio 버튼은 e가 필요 없는 이유
  지금 코드에서 사용하는 <Radio> 버튼은 값이 미리 정해져 있다.
  즉, 사용자가 버튼을 클릭했을 때 "전공"이면 true, "비전공"이면 false를 저장하면 됩니다.
  */
  const handleIsMajorChange = (value: boolean) => {
    setIsMajor(value)
  }

  const handleQuestionButtonClick = () => {
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
    ;(async () => {
      try {
        await RequestApi.posts.postQna({ id, isSecret, careerYear, isMajor, questionText })

        setQuestionText('')
        setIsSecret(false)
        setCareerYear(CareerYearType.대학생)
        setIsMajor(true)

        setTimeout(() => {
          setIsSuccessToastOpen(true)
          setSuccessToastMessage('질문이 등록되었습니다.')
        }, 1300)

        const qnas = await RequestApi.posts.getQnaList(qnaListType, id)
        setQnas(qnas)
      } catch (error: unknown) {
        /* ***더 공부하기***
        catch (error: any)
        
        에러: 
        1. 'error' is defined but never used.eslint@typescript-eslint/no-unused-vars,
        2. any: Unexpected any. Specify a different type.

        원인: catch 블록에서 error 변수를 선언했지만, 그 값을 어디에서도 사용하지 않아서

        해결방법: console로 확인해주는 코드 추가, throw "에러 발생!" 같은 문자열이 들어오면 error.message에서 런타임 오류가 발생할 수 있으므로 안전장치 추가하기
        */

        //의문점 throw "에러 발생!"이 생기는 조건은 뭐지? > 내가 throw을 설정안해줘도, 코드로 안 적어줘도 특정 상황에서 자동으로 실행되거나 출력될수 있어? >일부 코드 실행 중에 자동으로 예외가 발생하면 JavaScript 엔진 자체가 내부적으로 throw를 사용한다.
        if (error instanceof Error) {
          console.error('질문 등록에 실패했습니다!', error)
        }

        setIsErrorToastOpen(true)
        setErrorToastMessage('질문 등록에 실패했습니다!')
      }
    })()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    /*
    에러: 'AccountListResponse[]' 형식의 인수는 'SetStateAction<AccountResponse | undefined>' 형식의 매개 변수에 할당될 수 없습니다.ts(2345)

    원인: RequestApi.accounts.getAccount(id)은 배열[]을 반환하는데 setAccount는 AccountResponse타입을 기다리고 있기때문이다.
    */
    setIsLoading(true)
    ;(async () => {
      try {
        const account = await RequestApi.accounts.getAccount(id)
        setAccount(account)

        const qnas = await RequestApi.posts.getQnaList(qnaListType, id)
        setQnas(qnas)
        setIsLoading(false)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('', error)
        }
        setIsLoading(false)
        navigate(-1)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const qnas = await RequestApi.posts.getQnaList(qnaListType, id)
      setQnas(qnas)
    })()
  }, [qnaListType])

  return (
    <Container>
      <PageContainer>
        <PageContent>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              <Header>
                <ProfilePictureWrapper>
                  <ProfileImage src={account?.profile_image} alt={'profile-image'} />
                </ProfilePictureWrapper>

                <HeaderBody>
                  <ProfileSection>
                    <HeaderName>{account?.name}</HeaderName>
                    <HeaderField>{account?.field}</HeaderField>
                  </ProfileSection>
                  <HeaderJob>{'現 ' + account?.company1 + ' ' + account?.job1}</HeaderJob>
                </HeaderBody>
              </Header>

              <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '20px' }}>품앗이꾼 소개</div>
              <Description readOnly value={account?.description} />

              <Seperator />

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
                          color: 'red',
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
                          color: 'var(--gray-color)',
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
                  onChange={handleQuestionTextChange}
                  placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
                />

                <div style={{ marginTop: '7px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex' }}>
                    <FormControl>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        개발 경력
                      </InputLabel>
                      <NativeSelect value={careerYear} onChange={handleCareerYearChange}>
                        <option value={CareerYearType.대학생}>대학생</option>
                        <option value={CareerYearType.취준생}>취준생</option>
                        <option value={CareerYearType.신입_3년차}>신입~3년차</option>
                        <option value={CareerYearType._3년차_이상}>3년차 이상</option>
                      </NativeSelect>
                    </FormControl>

                    <RadioGroup row style={{ marginLeft: '7px' }}>
                      {/* <FormControlLabel
                        value="전공"
                        control={<Radio size="small" checked={isMajor} onChange={(e) => handleIsMajorChange(e, true)} />}
                        label="전공"
                      /> */}
                      <FormControlLabel
                        value="전공"
                        control={<Radio size="small" checked={isMajor} onChange={() => handleIsMajorChange(true)} />}
                        label="전공"
                      />
                      <FormControlLabel
                        value="비전공"
                        control={<Radio size="small" checked={!isMajor} onChange={() => handleIsMajorChange(false)} />}
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
                      color: 'white',
                    }}
                  />
                </div>
              </QuestionBody>

              <QuestionListBody>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>질문 History</div>

                <BadgeContainer>
                  <Badge onClick={() => handleClickBadge(QnaListType.ALL)} word={'전체'} />
                  <Badge onClick={() => handleClickBadge(QnaListType.ME)} word={'내질문'} />
                </BadgeContainer>

                <SolidSeperator />

                {qnas.length === 0 ? (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '24px',
                    }}
                  >
                    아직 질문이 없네요 :D
                  </div>
                ) : (
                  qnas.map((qna: GetQnaListResponse) => (
                    <QnaSection key={qna.public_id}>
                      {qna.is_secret && qna.questioner_public_id !== publicId ? (
                        <QnaCard>
                          <BlurOverlay>
                            <div style={{ display: 'flex' }}>
                              <QnaHead>Q.</QnaHead>
                              <QnaContentArea readOnly value={qna.question_text} />
                            </div>
                            <br />
                            <QnaContent style={{ color: 'var(--gray-color)', display: 'flex', justifyContent: 'flex-end' }}>{`${getCareerYearString(
                              qna.career_year
                            )} / ${qna.is_major ? '전공' : '비전공'} / ${qna.created_at}`}</QnaContent>
                          </BlurOverlay>
                          <TextBlurOverlay>비밀 질문이에요.</TextBlurOverlay>
                        </QnaCard>
                      ) : (
                        <div>
                          <QnaCard>
                            <div style={{ display: 'flex' }}>
                              <QnaHead>Q.</QnaHead>
                              <QnaContentArea readOnly value={qna.question_text} />
                            </div>

                            <br />

                            <QnaContent style={{ color: 'var(--gray-color)', display: 'flex', justifyContent: 'flex-end' }}>{`${getCareerYearString(
                              qna.career_year
                            )} / ${qna.is_major ? '전공' : '비전공'} / ${qna.created_at}`}</QnaContent>
                          </QnaCard>
                        </div>
                      )}

                      {qna.answer_text ? (
                        publicId === qna.questioner_public_id ? (
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <QnaCard>
                              <div style={{ display: 'flex' }}>
                                <QnaHead>A.</QnaHead>
                                <QnaContentArea readOnly value={qna.answer_text} />
                              </div>

                              <br />

                              <QnaContent
                                style={{ color: 'var(--gray-color)', display: 'flex', justifyContent: 'flex-end' }}
                              >{`품앗이꾼 ${account?.name}`}</QnaContent>
                            </QnaCard>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <QnaCard>
                              <BlurOverlay>
                                <div style={{ display: 'flex' }}>
                                  <QnaHead>A.</QnaHead>
                                  <QnaContentArea readOnly value={qna.answer_text} />
                                </div>
                                <br />
                                <QnaContent
                                  style={{ color: 'var(--gray-color)', display: 'flex', justifyContent: 'flex-end' }}
                                >{`품앗이꾼 ${account?.name}`}</QnaContent>
                              </BlurOverlay>
                              <TextBlurOverlay>
                                {accountToken ? '답변은 본인만 확인할 수 있어요 :)' : '답변을 보려면 로그인을 해주세요 :)'}
                              </TextBlurOverlay>
                            </QnaCard>
                          </div>
                        )
                      ) : (
                        <></>
                      )}
                    </QnaSection>
                  ))
                )}
              </QuestionListBody>
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
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 3px var(--light-gray-color) dashed;
  margin-top: 30px;
`

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

const QuestionListBody = styled.div`
  margin-top: 70px;
  width: 100%;

  @media (max-width: 520px) {
    margin-top: 0;
  }

  /* background-color: greenyellow; */
`

const BadgeContainer = styled(Grid)`
  width: 100%;
`

const SolidSeperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 2px var(--light-gray-color) solid;
  margin-top: 10px;
`

const QnaSection = styled.div`
  margin-bottom: 50px;

  @media (max-width: 520px) {
    margin-bottom: 30px;
  }
`

const QnaContentArea = styled(TextareaAutosize)`
  outline: none;
  font-size: 16px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;

  @media (max-width: 520px) {
    font-size: 14px;
  }
`

const QnaContent = styled.div`
  @media (max-width: 520px) {
    font-size: 14px;
  }
`

const QnaHead = styled.span`
  margin-top: -6px;
  font-weight: bold;
  font-size: 25px;
  margin-right: 10px;

  @media (max-width: 520px) {
    margin-top: -4px;
    font-size: 20px;
    margin-right: 5px;
  }
`

const QnaCard = styled(Card)`
  background-color: #f5f5f5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  padding: 20px;
  width: 60%;
  position: relative;

  @media (max-width: 520px) {
    width: 80%;
  }
`

const BlurOverlay = styled.div`
  width: 100%;
  height: 100%;
  filter: blur(7px);
  -webkit-filter: blur(7px);
`
const TextBlurOverlay = styled.div`
  font-size: 24px;
  word-break: keep-all;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  top: 50%;
  left: 50%;
  text-align: center;
  font-weight: bold;
`
