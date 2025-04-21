import { ProfileBadge } from '@components/badge'
import { QnaAskerType } from '@api/enums.ts'
import { GetQnaListResponse } from '@api/types.ts'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
// import TextareaAutosize from 'react-textarea-autosize'
// import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import { RequestApi } from '@api/request-api.ts'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { useAccountStore } from '@store/account'
import { useParams } from 'react-router-dom'
import { QuestionCard } from '@components/DetailPage/ui/web/QuestionCard.tsx'
import { AnswerCard } from '@components/DetailPage/ui/web/AnswerCard.tsx'

export function QuestionList() {
  const { id } = useParams()
  const { teacherAccount } = useDetailPageContext()
  const { publicId } = useAccountStore()
  const [qnaDataList, setQnaDataList] = useState<GetQnaListResponse[]>([]) //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(QnaAskerType.ALL) //QnA 필터 상태 관리

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

  const getIsSecretQuestion = (qna: GetQnaListResponse) => {
    // 비밀질문이 아닌 경우 모두 확인 가능
    if (qna.is_secret === 0) {
      return false
    }

    // 비밀질문인 경우, 본인만 확인가능
    if (qna.is_secret === 1) {
      return qna.questioner_public_id !== publicId
    }
    return true
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
        qnaDataList.map((qna) => (
          <QnaSection key={qna.public_id}>
            <QuestionCard
              questionText={qna.question_text}
              careerYear={qna.career_year}
              isMajor={qna.is_major === 0}
              createdAt={qna.created_at}
              isSecretQuestion={getIsSecretQuestion(qna)}
            />

            {qna.answer_text && (
              <AnswerCard answerText={qna.answer_text} isMyAnswer={publicId === qna.questioner_public_id} teacherName={teacherAccount?.name ?? ''} />
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

// const BlurOverlay = styled.div`
//   width: 100%;
//   height: 100%;
//   filter: blur(7px);
//   -webkit-filter: blur(7px);
// `
