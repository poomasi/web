import { ProfileBadge } from '@components/badge'
import { CareerYearType, QnaAskerType } from '@api/enums.ts'
import { GetQnaListResponse } from '@api/types.ts'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import TextareaAutosize from 'react-textarea-autosize'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import { RequestApi } from '@api/request-api.ts'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { useRecoilValue } from 'recoil'
import { accountTokenState, publicIdState } from '@store/account'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

const getCareerYearString = (career_year: string) => {
  switch (career_year) {
    case CareerYearType.ACADEMIC:
      return '대학생'
    case CareerYearType.JOB_SEEKER:
      return '취준생'
    case CareerYearType.JUNIOR:
      return '신입~3년차'
    case CareerYearType.MIDDLE:
      return '3년차 이상'
    default:
      return '대학생'
  }
}

export function QuestionList() {
  const { id } = useParams()
  const { teacherAccount } = useDetailPageContext()
  const accountToken: string | null = useRecoilValue(accountTokenState)
  const publicId: string | null = useRecoilValue(publicIdState)
  const [qnas, setQnas] = useState<GetQnaListResponse[]>([]) //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(QnaAskerType.ALL) //QnA 필터 상태 관리

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
    getTeacherQnaList()
  }, [id, qnaAskerType])

  return (
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
        <ProfileBadge onClick={() => setQnaAskerType(QnaAskerType.ALL)} badgeString={'전체'} selected={QnaAskerType.ALL === qnaAskerType} />
        <ProfileBadge onClick={() => setQnaAskerType(QnaAskerType.ME)} badgeString={'내 질문'} selected={QnaAskerType.ME === qnaAskerType} />
      </BadgeContainer>

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
        qnas.map((qna) => (
          <QnaSection key={qna.public_id}>
            {/* 비밀질문 분기 처리 */}
            {qna.is_secret && qna.questioner_public_id !== publicId ? (
              <QnaCard>
                <BlurOverlay>
                  <QnaHead>Q</QnaHead>
                  <QnaContentArea readOnly value={qna.question_text} />
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
                  <QnaHead>Q</QnaHead>
                  <QnaContentArea readOnly value={qna.question_text} />
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        backgroundColor: '#EAEBED',
                        marginRight: '6px',
                      }}
                    >
                      {getCareerYearString(qna.career_year)}
                    </div>
                    <div
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        backgroundColor: '#EAEBED',
                        marginRight: '12px',
                      }}
                    >
                      {qna.is_major ? '전공' : '비전공'}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {dayjs(qna.created_at).format('YYYY-MM-DD')}
                    </div>
                  </div>
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
                      <QnaContent
                        style={{ color: 'var(--gray-color)', display: 'flex', justifyContent: 'flex-end' }}
                      >{`품앗이꾼 ${teacherAccount?.name}`}</QnaContent>
                    </BlurOverlay>
                    <TextBlurOverlay>{accountToken ? '답변은 본인만 확인할 수 있어요 :)' : '답변을 보려면 로그인을 해주세요 :)'}</TextBlurOverlay>
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
  )
}

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

const QnaSection = styled.div`
  margin-bottom: 50px;

  @media (max-width: 520px) {
    margin-bottom: 30px;
  }
`

const QnaContentArea = styled(TextareaAutosize)`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: #f5f5f5;
  box-sizing: border-box;
  border: none;
  resize: none;

  color: #28292a;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  @media (max-width: 520px) {
    font-size: 14px;
  }
`

const QnaContent = styled.div`
  @media (max-width: 520px) {
    font-size: 14px;
  }
`

const QnaHead = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  background: #3ecdba;

  color: #ffffff;

  font-size: 32px;
`

const QnaCard = styled(Card)`
  background-color: #f5f5f5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  padding: 20px;
  width: 60%;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 32px;

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
