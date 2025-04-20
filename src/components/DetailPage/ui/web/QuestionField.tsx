import { AskerSpecificType, CareerYearType } from '@api/enums.ts'
import { DebouncedButton } from '@components/button'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { getPcVw } from '@utils/responsive'
import optionCheck from '@assets/images/option-check.svg'
import { useQuestionField } from '@components/DetailPage/model/hooks/useQuestionField.ts'

export function QuestionField() {
  const { id } = useParams()
  const {
    careerYear,
    handleExperienceChange,
    isMajor,
    handleMajorChange,
    questionText,
    handleQuestionTextChange,
    handleIsSecretChange,
    isSecret,
    handleQuestionButtonClick,
  } = useQuestionField(id ?? '')

  return (
    <QuestionSection>
      <QuestionFieldTitle>질문하기</QuestionFieldTitle>
      <AskerInfo>
        <SelectContainer>
          <SelectTitle htmlFor="career-select">개발 경력</SelectTitle>
          <StyledSelect id="career-select" value={careerYear} onChange={handleExperienceChange}>
            <option value={CareerYearType.ACADEMIC}>대학생</option>
            <option value={CareerYearType.JOB_SEEKER}>취준생</option>
            <option value={CareerYearType.JUNIOR}>신입~3년차</option>
            <option value={CareerYearType.MIDDLE}>3년차 이상</option>
          </StyledSelect>
        </SelectContainer>

        <SelectContainer>
          <SelectTitle>전공 사항</SelectTitle>
          <StyledSelect
            id="specific-type"
            value={isMajor ? AskerSpecificType.SPECIALTY : AskerSpecificType.NONE_SPECIALTY}
            onChange={handleMajorChange}
          >
            <option value={AskerSpecificType.SPECIALTY}>전공자</option>
            <option value={AskerSpecificType.NONE_SPECIALTY}>비전공자</option>
          </StyledSelect>
        </SelectContainer>
      </AskerInfo>

      <QuestionArea>
        <QuestionTextField
          value={questionText}
          onChange={handleQuestionTextChange}
          placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
        />
        <QuestionOption>
          <QuestionFieldLength>
            글자수: (<span>{questionText.length}</span> / 500)
          </QuestionFieldLength>
          <QuestionSecretOption onClick={handleIsSecretChange}>
            <QuestionCheckbox>{isSecret && <img src={optionCheck} />}</QuestionCheckbox>
            <span>비밀질문</span>
          </QuestionSecretOption>
        </QuestionOption>
      </QuestionArea>

      <div style={{ marginLeft: 'auto' }}>
        <DebouncedButton
          text={'등록'}
          onClick={() => handleQuestionButtonClick()}
          variant="contained"
          sx={{
            width: '60px',
            height: '40px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '10px',
            color: 'white',
          }}
        />
      </div>
    </QuestionSection>
  )
}

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
`

const QuestionFieldTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`

const AskerInfo = styled.div`
  display: flex;
`

const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--Gray-200, #eaebed);
  background: #f7f7f7;

  padding: 24px ${getPcVw(32)};
`

const QuestionTextField = styled.textarea`
  // element 디자인 요소소
  width: 100%;
  min-height: 270px;
  resize: none;
  background: transparent;
  border-width: 0 0 1px 0;

  // focus 시, 기본 디자인이 노출되는 사항 비활성화
  outline: none !important;
  box-shadow: none !important;

  // element 폰트 요소
  color: #9b9ea2;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`

const QuestionOption = styled.div`
  width: 100%;
  margin: 24px 0 0;
  display: flex;
  justify-content: space-between;
`

const QuestionFieldLength = styled.div`
  color: #9b9ea2;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  span {
    color: #3ecdba;
  }
`

const QuestionSecretOption = styled.div`
  display: flex;
  gap: 8px;
`

const QuestionCheckbox = styled.div`
  width: 24px;
  height: 24px;

  border-radius: 5px;
  border: 1px solid #c5c8cd;
  background: #ffffff;
`

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 15px;
  padding: 8px 12px;
  border-radius: 100px;
  border: 1px solid #c5c8cd;
  background: #fff;
`

const SelectTitle = styled.label`
  font-weight: bold;
  font-size: 16px;
  color: black;
  white-space: nowrap;
  cursor: pointer; // 커서 포인터 추가
`

// 스타일링 수정:
const StyledSelect = styled.select`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  text-align: center;

  /* flex 대신 inline-block 사용 */
  display: inline-block;
  padding-right: 10px;

  /* 다른 속성들은 유지 */
  color: #3ecdba;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  height: 24px;
  padding-top: 3px;

  &:focus {
    outline: none;
  }

  option {
    color: black;
  }
`
