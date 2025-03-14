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
  // const [isLoading, setIsLoading]: [boolean, Function] = useState(false)     ESLint 규칙에서 에러남,Function 타입은 너무 포괄적이기때문
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [account, setAccount] = useState<AccountResponse | undefined>(undefined)
  const [qnas, setQnas] = useState<GetQnaListResponse[]>([])
  const [qnaListType, setQnaListType] = useState<QnaListType>(QnaListType.ALL)

  /**
   * Question info
   */
  const [questionText, setQuestionText] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)

  // U(대학생), R(취준생), N(신입~3년차), S(3년차 이상)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.대학생)
  const [isMajor, setIsMajor] = useState<boolean>(true)

  const handleClickBadge = (word: string) => {
    setQnaListType(word)
  }

  const handleQuestionTextChange = (event: any) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value)
    }
  }
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev)
  }
  const handleCareerYearChange = (event: any) => {
    setCareerYear(event.target.value)
  }
  const handleIsMajorChange = (e: any, value: boolean) => {
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
      } catch (error: any) {
        setIsErrorToastOpen(true)
        setErrorToastMessage('질문 등록에 실패했습니다!')
      }
    })()
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    setIsLoading(true)
    ;(async () => {
      try {
        const account = await RequestApi.accounts.getAccount(id)
        setAccount(account)

        const qnas = await RequestApi.posts.getQnaList(qnaListType, id)
        setQnas(qnas)
        setIsLoading(false)
      } catch (error: any) {
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
                      <FormControlLabel
                        value="전공"
                        control={<Radio size="small" checked={isMajor} onChange={(e) => handleIsMajorChange(e, true)} />}
                        label="전공"
                      />
                      <FormControlLabel
                        value="비전공"
                        control={<Radio size="small" checked={!isMajor} onChange={(e) => handleIsMajorChange(e, false)} />}
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
