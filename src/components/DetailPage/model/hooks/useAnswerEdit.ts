// @hooks/useAnswerEdit.ts
import { useState, useEffect } from 'react'
import { EditsApi } from '@utils/api/edits/edit-api'
import type { PostQnaAnswerResponse } from '@utils/api/posts/posts-api'

export function useAnswerEdit(publicId: string, initialText: string, onUpdateRequest?: () => void) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(initialText)
  const [showEditBtn, setShowEditBtn] = useState(false)

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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value)
  }

  const handleSaveClick = async () => {
    try {
      const response: PostQnaAnswerResponse = await EditsApi.patchQnaAnswer(publicId, editedText)
      setIsEditing(false)
      if (onUpdateRequest) onUpdateRequest()

      // 서버에서 최신 answer_text 내려줬다면 업데이트
      if (response?.answer_text) {
        setEditedText(response.answer_text)
      }
    } catch (error) {
      console.error('답변 수정 실패:', error)
    }
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
