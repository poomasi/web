import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import TextareaAutosize from 'react-textarea-autosize'
import { useAccountStore } from '@store/account'
import { colors } from '@styles/foundation/color'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import dayjs from 'dayjs'
import { getMobileVw } from '@utils/responsive.ts'

interface AnswerCardProps {
  answerText: string
  isMyAnswer: boolean
  teacherName: string
  answerDate: string
}

export function AnswerCard({ answerText, isMyAnswer, answerDate }: AnswerCardProps) {
  const { accountToken } = useAccountStore()
  const { teacherAccount } = useDetailPageContext()

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <QnaCard>
        {/* 비밀 질문 인 경우, 블러처리 */}
        {isMyAnswer && (
          <BlurOverlay>
            <TextBlurOverlay>{accountToken ? '비밀 답변이예요' : '답변을 보려면 로그인을 해주세요 :)'}</TextBlurOverlay>
          </BlurOverlay>
        )}
        <QnaHead>
          <AnswerImg src={teacherAccount?.profile_image} />
          <span>정민찬</span>
        </QnaHead>
        <QnaContentArea readOnly value={answerText} />

        <AnswerDate>{dayjs(answerDate).format('YYYY-MM-DD')}</AnswerDate>
      </QnaCard>
    </div>
  )
}

const QnaCard = styled(Card)`
  background-color: #ffffff;
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

  @media (max-width: 1024px) {
    width: ${getMobileVw(290)};
    border-radius: 20px;
    padding: 24px 20px;
    box-shadow: none;
    gap: 20px;
  }
`

const QnaHead = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  color: #0e0e0e;

  gap: 12px;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`

const AnswerImg = styled.img`
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 100%;

  @media (max-width: 1024px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const QnaContentArea = styled(TextareaAutosize)`
  width: 100%;
  height: 100%;
  outline: none;
  box-sizing: border-box;
  border: none;
  resize: none;

  color: #28292a;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
    /* margin-bottom: 30px; */
    font-size: 1rem;
    font-weight: 500;
  }
`

const AnswerDate = styled.div`
  color: var(--gray-color);
  display: flex;
  justify-content: start;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`
