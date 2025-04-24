import styled from '@emotion/styled'
import { useState } from 'react'
import { PostsApi } from '@api/posts'
import { useAccountStore } from '@store/account'

interface Props {
  qnaId: string
  onSuccess: () => void
}

export function AnswerEditor({ qnaId, onSuccess }: Props) {
  const { accountType } = useAccountStore()
  const [text, setText] = useState('')
  const [isWriting, setIsWriting] = useState(false)

  if (accountType !== 'ADMIN') return null

  const handleSubmit = async () => {
    try {
      await PostsApi.postQnaAnswer(qnaId, text)
      setText('')
      setIsWriting(false)
      onSuccess()
    } catch (err) {
      console.error('답글 등록 실패:', err)
    }
  }

  return (
    <EditorWrapper>
      {isWriting ? (
        <>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="댓글을 입력해주세요." maxLength={500} />
          <BottomRow>
            <CharCount>{text.length} / 500</CharCount>
            <RegisterButton onClick={handleSubmit}>등록</RegisterButton>
          </BottomRow>
        </>
      ) : (
        <WriteButton onClick={() => setIsWriting(true)}>답글달기</WriteButton>
      )}
    </EditorWrapper>
  )
}

const EditorWrapper = styled.div`
  margin-top: 12px;
  padding-left: 4px;
`

const WriteButton = styled.button`
  padding: 6px 12px;
  background-color: #d9f3f0;
  color: #1c1c1c;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`

const CharCount = styled.span`
  font-size: 12px;
  color: #999;
`

const RegisterButton = styled.button`
  padding: 8px 16px;
  background-color: #3ecdba;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
`
