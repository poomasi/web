import { useToastMessageStore } from '@store/toast'
import { useAccountStore } from '@store/account'
import { useCallback, useState } from 'react'
import { AskerSpecificType, CareerYearType } from '@api/enums.ts'
import { RequestApi } from '@api/request-api.ts'

const QUESTION_MAX_LENGTH: number = 500

export const useQuestionField = (id: string) => {
  const { setSuccessToastMessage, setErrorToastMessage } = useToastMessageStore()
  const { accessToken } = useAccountStore()
  const [questionText, setQuestionText] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.ACADEMIC)
  const [isMajor, setIsMajor] = useState<boolean>(true)

  //질문글 등록
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value)
    }
  }
  //비밀 질문 여부 체크
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev)
  }

  //개발 경력 필터
  const handleExperienceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCareerYear(event.target.value as CareerYearType)
  }

  //전공 여부 체크
  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsMajor(event.target.value === AskerSpecificType.SPECIALTY)
  }

  // Tanstack Query의 useMutation을 사용하면, API 요청을 더 간편하게 처리할 수 있습니다.
  const postingQuestion = async () => {
    try {
      //질문 데이터를 서버에 등록
      await RequestApi.posts.postQna({ id, isSecret, careerYear, isMajor, questionText })

      //질문 등록 후, 리셋
      setQuestionText('')
      setIsSecret(false)
      setCareerYear(CareerYearType.ACADEMIC)
      setIsMajor(true)

      setTimeout(() => {
        setSuccessToastMessage('질문이 등록되었습니다.')
      }, 1300)

      //질문 목록 불러오기
      /*const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
			setQnas(qnas.data) // UI에 반영*/
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('질문 등록에 실패했습니다!', error)
      }

      setErrorToastMessage('질문 등록에 실패했습니다!')
    }
  }

  // 팁 !
  // function 재랜더링 되지 않도록 함.
  // 관련하여, 오버 엔지리어닝이 되는 경우도 있다하니 관련 내용은 고민해보도록 하겠습니다.
  const handleQuestionButtonClick = useCallback(async () => {
    if (!accessToken) {
      setErrorToastMessage('질문하려면 로그인이 필수입니다!')
      return
    }

    if (questionText.length < 10) {
      setErrorToastMessage('질문은 10자 이상이어야 합니다!')
      return
    }

    // 질문 등록
    await postingQuestion()
  }, [accessToken, questionText])

  return {
    questionText,
    isSecret,
    careerYear,
    isMajor,
    handleQuestionTextChange,
    handleIsSecretChange,
    handleExperienceChange,
    handleMajorChange,
    handleQuestionButtonClick,
  }
}
