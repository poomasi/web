import { useState, useEffect } from 'react'
import { EditsApi } from '@utils/api/edits/edit-api'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'

export function useMentoProfileEdit(initialDescription: string, onUpdateRequest?: () => void) {
  const { teacherAccount } = useDetailPageContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(initialDescription)
  const [changeBtnText, setChangeBtnText] = useState(false)

  useEffect(() => {
    setEditedText(initialDescription)
  }, [initialDescription])

  const handleEditClick = () => {
    setIsEditing(true)
    setChangeBtnText(true)
  }

  const handleSaveClick = async () => {
    try {
      const response: teacherAccount.AccountResponse.description = await EditsApi.patchMentoProfile(editedText)
      setIsEditing(false)
      if (onUpdateRequest) onUpdateRequest()

      if (response.description) {
        setEditedText(response.description)
      }
    } catch (error) {
      console.error('프로필 수정 실패:', error)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value)
  }

  return {
    isEditing,
    editedText,
    changeBtnText,
    handleEditClick,
    handleTextChange,
    handleSaveClick,
  }
}
