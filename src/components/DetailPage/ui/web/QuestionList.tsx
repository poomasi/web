import { ProfileBadge } from '@components/badge'
import { QnaAskerType } from '@api/enums.ts'
import { GetQnaListResponse } from '@api/types.ts'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import TextareaAutosize from 'react-textarea-autosize'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import { RequestApi } from '@api/request-api.ts'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { useAccountStore } from '@store/account'
import { useParams } from 'react-router-dom'
import { colors } from '@styles/foundation/color'
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

  font-size: 2rem;

  @media (max-width: 767px) {
    width: 1.5rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
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
    width: 85%;
    border-radius: 20px;
    padding: 20px 20px 40px;
    box-shadow: none;
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
  color: #fff;
  background-color: rgba(78, 80, 83, 0.7);
  padding: 16px;
  height: 38px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    /* margin-bottom: 30px; */
    font-size: 1rem;
    font-weight: 500;
  }
`

const QnaContentCareer = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${colors.gray200};
  margin-right: 6px;
  color: ${colors.gray500};

  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`
const QnaContentMajor = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  background-color: ${colors.gray200};
  margin-right: 12px;
  color: ${colors.gray500};

  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`

const QnaContentDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    position: absolute;
    bottom: 8%;
    font-size: 0.75rem;
    color: ${colors.gray500};
  }
`
