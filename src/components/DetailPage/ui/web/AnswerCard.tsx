import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import TextareaAutosize from 'react-textarea-autosize'
import { useAccountStore } from '@store/account'
import { colors } from '@styles/foundation/color'

interface AnswerCardProps {
  answerText: string
  isMyAnswer: boolean
  teacherName: string
}

export function AnswerCard({ answerText, isMyAnswer, teacherName }: AnswerCardProps) {
  const { accountToken } = useAccountStore()

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <QnaCard>
        {/* 비밀 질문 인 경우, 블러처리 */}
        {isMyAnswer && (
          <BlurOverlay>
            <TextBlurOverlay>{accountToken ? '비밀 답변이예요' : '답변을 보려면 로그인을 해주세요 :)'}</TextBlurOverlay>
          </BlurOverlay>
        )}
        <QnaHead>A</QnaHead>
        <QnaContentArea readOnly value={answerText} />

        <div
          style={{
            color: 'var(--gray-color)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >{`품앗이꾼 ${teacherName}`}</div>
      </QnaCard>
    </div>
  )
}

const QnaCard = styled(Card)`
  background-color: #f5f5f5;
  box-shadow: none;
  border-radius: 22px;
  padding: 24px 28px 32px;
  margin-top: 20px;
  width: 60%;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 1px solid ${colors.green500};

  @media (max-width: 520px) {
    width: 85%;
    border-radius: 20px;
    padding: 20px 20px 40px;
    box-shadow: none;
  }
`

const QnaHead = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #3ecdba;

  color: #ffffff;

  font-size: 32px;

  @media (max-width: 767px) {
    width: 1.5rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  top: 50%;
  left: 50%;

  text-align: center;
  color: #fff;
  background-color: rgba(78, 80, 83, 0.7);
  border-radius: 500px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 12px 18px;
  font-weight: 500;

  @media (max-width: 767px) {
    /* margin-bottom: 30px; */
    font-size: 1rem;
    font-weight: 500;
  }
`
