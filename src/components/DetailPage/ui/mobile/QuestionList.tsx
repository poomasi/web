import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccountStore } from '@store/account'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider'
import { ProfileBadge } from '@components/badge'
import { QuestionCard } from '@components/DetailPage/ui/web/QuestionCard'
import { AnswerCard } from '@components/DetailPage/ui/web/AnswerCard'
// import { AnswerCard } from '@components/DetailPage/ui/mobile/AnswerCard'
import { RequestApi } from '@api/request-api'
import { GetQnaListResponse } from '@api/types'
import { QnaAskerType } from '@api/enums'
import { colors } from '@styles/foundation/color'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import { getMobileVw } from '@utils/responsive'

export function QuestionList() {
  const { id } = useParams()
  const { publicId, accountType } = useAccountStore()
  const { teacherAccount } = useDetailPageContext()

  const [qnaDataList, setQnaDataList] = useState<GetQnaListResponse[]>([]) //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(QnaAskerType.ALL) //QnA 필터 상태 관리

  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const getTeacherQnaList = async () => {
    try {
      const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
      setQnaDataList(qnas.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('', error)
      }
    }
  }

  const handleReplySubmit = async (qnaId: string) => {
    const text = replyTexts[qnaId]?.trim()
    if (!text) return

    try {
      await RequestApi.posts.postQnaAnswer(qnaId, text)
      setReplyTexts((prev) => ({ ...prev, [qnaId]: '' }))
      getTeacherQnaList()
    } catch (err) {
      console.error('댓글 등록 실패:', err)
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

      {qnaDataList.length === 0 ? (
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
        qnaDataList.map((qna) => {
          // console.log('accountType:', accountType)
          // console.log('qna.answer_text:', qna.answer_text)

          return (
            <QnaSection key={qna.public_id}>
              <QuestionCard question={qna} key={qna.public_id} />

              {qna.answer_text ? (
                <AnswerCard
                  answerText={qna.answer_text}
                  isMyAnswer={publicId === qna.questioner_public_id}
                  teacherName={teacherAccount?.name ?? ''}
                  answerDate={qna.updated_at}
                />
              ) : (
                accountType === 'ADMIN' && (
                  <ReplyTextareaWrapper>
                    <ReplyTextarea
                      value={replyTexts[qna.public_id] || ''}
                      onChange={(e) =>
                        setReplyTexts((prev) => ({
                          ...prev,
                          [qna.public_id]: e.target.value,
                        }))
                      }
                      onFocus={() => setFocusedId(qna.public_id)}
                      onBlur={() => setFocusedId(null)}
                      isFocused={focusedId === qna.public_id}
                      placeholder="답글을 입력해주세요."
                      maxLength={500}
                    />
                    <ReplyButton onClick={() => handleReplySubmit(qna.public_id)}>
                      {' '}
                      <SendIcon style={{ fontSize: '15px' }} />
                    </ReplyButton>
                  </ReplyTextareaWrapper>
                )
              )}
            </QnaSection>
          )
        })
      )}
    </QuestionListBody>
  )
}

const ReplyTextareaWrapper = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    gap: 14px;
  }
`

const ReplyTextarea = styled.textarea<{ isFocused: boolean }>`
  height: ${(props) => (props.isFocused ? '140px' : '40px')};
  resize: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  transition: height 0.2s ease;
  color: ${colors.gray500};
  @media (max-width: 1024px) {
    width: ${getMobileVw(290)};
    resize: none;
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
  }
`

const ReplyButton = styled.button`
  margin-top: 8px;
  background-color: ${colors.green200};
  color: ${colors.green600};
  padding: 6px 10px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
`

const QuestionListBody = styled.div`
  margin-top: 70px;
  width: 100%;

  @media (max-width: 1024px) {
    margin-top: 2rem;
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
