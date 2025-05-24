import { useState, useEffect } from 'react'
import { EditsApi } from '@utils/api/edits/edit-api'
import { useToastMessageStore } from '@store/toast'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'

export function useMentoProfileEdit(initialDescription: string, onUpdateRequest?: () => void) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(initialDescription)
  const [loading, setLoading] = useState(false)
  const { teacherAccount } = useDetailPageContext()

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
        await EditsApi.patchMentoProfile({
          description: editedText,
          profile_image: teacherAccount?.profile_image ?? null,
          field: teacherAccount?.field ?? null,
          company1: teacherAccount?.company1 ?? null,
          job1: teacherAccount?.job1 ?? null,
          company2: teacherAccount?.company2 ?? null,
          job2: teacherAccount?.job2 ?? null,
        })
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
