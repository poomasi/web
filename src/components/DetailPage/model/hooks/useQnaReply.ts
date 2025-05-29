// useQnaReply.ts
import { useState } from 'react'
import { RequestApi } from '@utils/api/request-api'

export function useQnaReply(refetch: () => void) {
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const handleReplySubmit = async (qnaId: string) => {
    const text = replyTexts[qnaId]?.trim()
    if (!text) return
    try {
      await RequestApi.posts.postQnaAnswer(qnaId, text)
      setReplyTexts((prev) => ({ ...prev, [qnaId]: '' }))
      refetch()
    } catch (err) {
      console.error('댓글 등록 실패:', err)
    }
  }

  return {
    replyTexts,
    setReplyTexts,
    focusedId,
    setFocusedId,
    handleReplySubmit,
  }
}
