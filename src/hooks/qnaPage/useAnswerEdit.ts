// @hooks/useAnswerEdit.ts
import { useState, useEffect } from 'react'
import { EditsApi } from '@utils/api/edits/edit-api'
import type { PostQnaAnswerResponse } from '@utils/api/posts/posts-api'

export function useAnswerEdit(publicId: string, initialText: string, onUpdateRequest?: () => void) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(initialText)
  const [showEditBtn, setShowEditBtn] = useState(false)

  //initialText: 외부에서 받은 값 (비교/초기화용)
  // editedText: 사용자가 수정하는 로컬 값
  useEffect(() => {
    setEditedText(initialText)
  }, [initialText])

  const handleEditClick = () => {
    setIsEditing(true)
    setShowEditBtn(false)
  }
  const handleCancelClick = () => {
    setIsEditing(false)
    setEditedText(initialText)
  }

  const handleSaveClick = async () => {
    try {
      const response: PostQnaAnswerResponse = await EditsApi.patchQnaAnswer(publicId, editedText)
      setIsEditing(false)
      if (onUpdateRequest) onUpdateRequest() //부모(또는 상위 컴포넌트)에서 전달한 함수가 있다면 실행: 콜백 함수 호출

      // 서버에서 최신 answer_text 내려줬다면 업데이트
      if (response?.answer_text) {
        setEditedText(response.answer_text)
      }
    } catch (error) {
      console.error('답변 수정 실패:', error)
    }
  }

  //수정내용 화면에 실시간 반영
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value)
  }

  const toggleEditBtn = () => setShowEditBtn((prev) => !prev)

  return {
    isEditing,
    editedText,
    toggleEditBtn,
    handleEditClick,
    handleCancelClick,
    handleTextChange,
    handleSaveClick,
    showEditBtn,
  }
}
