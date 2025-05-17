import { useState } from 'react'
import { EditsApi } from '@utils/api/edits/edit-api'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'

export function useMentoProfileEdit() {
  const { teacherAccount } = useDetailPageContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(teacherAccount.description)
  const [changeBtnText, setChangeBtnText] = useState(false)
}
