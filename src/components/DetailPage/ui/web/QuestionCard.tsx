import dayjs from 'dayjs'
import { CareerYearType } from '@api/enums.ts'
import { useCallback } from 'react'
import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import TextareaAutosize from 'react-textarea-autosize'
import { useAccountStore } from '@store/account'

type QuestionCardProps = {
  questionText: string
  isSecretQuestion: boolean
  careerYear: string
  isMajor: boolean
  createdAt: string
}

export function QuestionCard({ questionText, careerYear, isMajor, createdAt, isSecretQuestion }: QuestionCardProps) {
  const { accountToken } = useAccountStore()
  const getCareerYearString = useCallback((career_year: string) => {
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
  }, [])

  return (
    <QnaCard>
      {/* 비밀 질문 인 경우, 블러처리 */}
      {isSecretQuestion && (
        <BlurOverlay>
          <TextBlurOverlay>{accountToken ? '답변은 본인만 확인할 수 있어요 :)' : '답변을 보려면 로그인을 해주세요 :)'}</TextBlurOverlay>
        </BlurOverlay>
      )}
      <QnaHead>Q</QnaHead>
      <QnaContentArea readOnly value={questionText} />
      <div style={{ display: 'flex' }}>
        <div
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: '#EAEBED',
            marginRight: '6px',
          }}
        >
          {getCareerYearString(careerYear)}
        </div>
        <div
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: '#EAEBED',
            marginRight: '12px',
          }}
        >
          {isMajor ? '전공' : '비전공'}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </div>
      </div>
    </QnaCard>
  )
}

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

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextBlurOverlay = styled.div`
  font-size: 24px;
  word-break: keep-all;
  text-align: center;
  font-weight: bold;
  z-index: 11;
  padding: 0 20px;

  @media (max-width: 520px) {
    font-size: 18px;
  }
`
