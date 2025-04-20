import { ProfileBadge } from '@components/badge'
import { QnaAskerType } from '@api/enums.ts'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { QuestionCard } from '@components/DetailPage/ui/web/QuestionCard.tsx'
import { AnswerCard } from '@components/DetailPage/ui/web/AnswerCard.tsx'
import { useQuestionList } from '@components/DetailPage/model/hooks/useQuestionList.ts'
import { useAccountStore } from '@store/account'

export function QuestionList() {
  const { teacherAccount } = useDetailPageContext()
  const { publicId } = useAccountStore()
  const { setQnaAskerType, qnaAskerType, qnaDataList, getIsSecretQuestion } = useQuestionList()

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
