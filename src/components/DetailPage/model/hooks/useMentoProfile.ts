import { useState, useEffect } from 'react'
import { EditsApi } from '@utils/api/edits/edit-api'
import { useToastMessageStore } from '@store/toast'

export function useMentoProfileEdit(initialDescription: string, onUpdateRequest?: () => void) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(initialDescription)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEditedText(initialDescription)
  }, [initialDescription])

  const { setSuccessToastMessage } = useToastMessageStore()

  const handleEditClick = async () => {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      try {
        setLoading(true)
        await EditsApi.patchMentoProfile(editedText)
        setIsEditing(false)
        setLoading(false)
        setSuccessToastMessage('저장되었습니다')
        if (onUpdateRequest) onUpdateRequest()
      } catch (error) {
        setLoading(false)
        console.error('프로필 수정 실패:', error)
      }
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value)
  }

  return {
    isEditing,
    editedText,
    loading,
    handleEditClick,
    handleTextChange,
  }
}
