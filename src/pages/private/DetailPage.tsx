import { useToastClear } from '@hooks/use-toast-clear.ts'
import { accountTokenState, publicIdState } from '@store/index.ts'
import { useRecoilValue } from 'recoil'

import styled from '@emotion/styled'
import TextareaAutosize from 'react-textarea-autosize'
import { useNavigate, useParams } from 'react-router-dom'
import { CareerYearType, GetQnaListResponse, QnaAskerType, RequestApi } from '@api/index.ts'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { ProfileBadge } from '@components/badge'
import { TeacherIntroduce } from '@components/DetailPage/ui/web/TeacherIntroduce.tsx'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { QuestionField } from '@components/DetailPage/ui/web/QuestionField.tsx'

const getCareerYearString = (career_year: string) => {
  switch (career_year) {
    case CareerYearType.대학생:
      return '대학생'
    case CareerYearType.취준생:
      return '취준생'
    case CareerYearType.JUNIOR:
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

  const navigate = useNavigate()
  const { id } = useParams()
  const { teacherAccount } = useDetailPageContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [qnas, setQnas] = useState<GetQnaListResponse[]>([]) //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(QnaAskerType.ALL) //QnA 필터 상태 관리

  //전체 or 내질문만 보는 필터
  const handleFilterByAsker = (word: QnaAskerType) => {
    setQnaAskerType(word)
  }

  const getTeacherQnaList = async () => {
    try {
      const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
      setQnas(qnas.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('', error)
      }
    }
  }

  useEffect(() => {
    if(publicId === null) {
      navigate("/");
    }
  }, [])

  useEffect(() => {
    getTeacherQnaList()
  }, [id, qnaAskerType])

  return (
    <Container>
      <PageContainer>
        <PageContent>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              <TeacherIntroduce />
              <Seperator />

              <QuestionField />

              <QuestionListBody>
                <div
                  style={{
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  질문 History
                </div>

                <BadgeContainer>
                  <ProfileBadge onClick={() => handleFilterByAsker(QnaAskerType.ALL)} badgeString={'전체'} />
                  <ProfileBadge onClick={() => handleFilterByAsker(QnaAskerType.ME)} badgeString={'내 질문'} />
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
                  /*
                  에러: TypeError: qnas.map is not a function

                  원인: qnas이 배열이 아니라서

                  */
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
                            <QnaContent
                              style={{
                                color: 'var(--gray-color)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                              }}
                            >{`${getCareerYearString(qna.career_year)} / ${qna.is_major ? '전공' : '비전공'} / ${qna.created_at}`}</QnaContent>
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

                            <QnaContent
                              style={{
                                color: 'var(--gray-color)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                              }}
                            >{`${getCareerYearString(qna.career_year)} / ${qna.is_major ? '전공' : '비전공'} / ${qna.created_at}`}</QnaContent>
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
                              >{`품앗이꾼 ${teacherAccount?.name}`}</QnaContent>
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
                                >{`품앗이꾼 ${teacherAccount?.name}`}</QnaContent>
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
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 3px var(--light-gray-color) dashed;
  margin-top: 30px;
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
