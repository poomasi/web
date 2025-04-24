import styled from '@emotion/styled'
import { useState } from 'react'
import { PostsApi } from '@api/posts'

type AnswerModalProps = {
  qnaId: string
  onClose: () => void
  onSuccess: () => void
}

export function AnswerModal({ qnaId, onClose, onSuccess }: AnswerModalProps) {
  const [text, setText] = useState('')

  const handleSubmit = async () => {
    if (text.trim().length === 0) return

    try {
      await PostsApi.postQnaAnswer(qnaId, text)
      setText('')
      onSuccess() // 질문 목록 새로고침
      onClose() // 모달 닫기
    } catch (err) {
      console.error('답글 등록 실패:', err)
    }
  }

  return (
    <Overlay>
      <Modal>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="답변을 입력해주세요." maxLength={500} />
        <Footer>
          <CharCount>{text.length} / 500</CharCount>
          <Button onClick={handleSubmit}>등록</Button>
          <CancelButton onClick={onClose}>닫기</CancelButton>
        </Footer>
      </Modal>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

const Modal = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`

const CharCount = styled.span`
  font-size: 14px;
  color: #888;
`

const Button = styled.button`
  background-color: #3ecdba;
  color: white;
  padding: 8px 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

const CancelButton = styled(Button)`
  background-color: #ccc;
  margin-left: 8px;
`
