import styled from '@emotion/styled'
import { ProfileCard } from '@components/profileCards/ProfileCard'
import { ProfileBadge } from '@components/badge'
import { useProfileList } from '@components/LandingPage/hooks/useProfileList.ts'
import { getMobileVw } from '@utils/responsive'
import { useSwiper } from '@components/LandingPage/hooks/useSwiper'
import { useMemo } from 'react'

export function MobileProfilesSection() {
  const { selectedField, handleClickBadge, accountList, badgeList } = useProfileList()

  //필터링된 배열
  const filteredForPagination = useMemo(() => {
    return selectedField === null ? accountList : accountList.filter((account) => account.field === selectedField)
  }, [accountList, selectedField])

  //리스트 3개씩 나누기
  //<T,> 처럼 콤마 ,를 붙여야 TypeScript가 JSX로 인식하지 않고 제네릭으로 이해해요!
  //[][] → 숫자 배열이 여러 개 들어간 2차원 배열   예: [[1, 2], [3, 4], [5, 6]]
  const chunkArray = <T,>(arr: T[], targetNumber: number): T[][] => {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += targetNumber) {
      result.push(arr.slice(i, i + targetNumber))
    }
    return result
  }
  const chunkedProfiles = chunkArray(filteredForPagination, 3)

  // useSwiper에 전체리스트 갯수를 전달 (훅에서는 totalItems로 받음)
  const { swiperRef, currentPage, totalPages } = useSwiper(filteredForPagination.length)

  return (
    <ProfilesSectionContainer id="profileSection">
      <SectionTitle>
        <SubHead>품앗이꾼</SubHead>
        <BadgeContainer>
          <ProfileBadge onClick={() => handleClickBadge(null)} badgeString={'전체'} selected={selectedField === null} />
          {badgeList.map((badge) => (
            <ProfileBadge key={badge} onClick={() => handleClickBadge(badge)} badgeString={badge} selected={badge === selectedField} />
          ))}
        </BadgeContainer>
      </SectionTitle>
      <PaginationBox>
        {currentPage} / {totalPages}
      </PaginationBox>
      {/* useRef을 이용하며 특정 DOM 요소에 직접 useSwiper훅을 연결 */}
      <PoomProfileCardList ref={swiperRef}>
        {' '}
        {chunkedProfiles.map((group, index) => (
          <SnapWrapper key={index} className="swiper-slide">
            {group.map((account) => (
              <ProfileCard key={account.public_id} profileData={account} />
            ))}
          </SnapWrapper>
        ))}
      </PoomProfileCardList>
      {/* <PoomProfileCardList ref={swiperRef}>
        {accountList
          .filter((account) => {
            if (selectedField === null) {
              return true
            }
            return account.field === selectedField
          })
          .map((account) => (
            // console.log(Public ID:`, account.public_id);
            <ProfileCard key={account.public_id} profileData={account} />
          ))}
      </PoomProfileCardList> */}
    </ProfilesSectionContainer>
  )
}

const SnapWrapper = styled.div`
  scroll-snap-align: start;
  flex: 0 0 90%;
  flex-shrink: 0; // 줄어들지 않도록 고정
  display: flex;
  flex-direction: column;
  /* gap: ${getMobileVw(12)}; */
`

const ProfilesSectionContainer = styled.div`
  margin-top: ${getMobileVw(40)};
  padding: 0 ${getMobileVw(20)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: ${getMobileVw(20)};
`

const SubHead = styled.div`
  color: #0e0e0e;
  font-size: ${getMobileVw(24)};
  font-weight: 700;
  line-height: 1.5;
`

const BadgeContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: ${getMobileVw(10)};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PaginationBox = styled.div`
  align-self: flex-end;
  margin-top: ${getMobileVw(8)};
  font-size: ${getMobileVw(13)};
  color: #888;
`

const PoomProfileCardList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: ${getMobileVw(5)};
  padding-bottom: ${getMobileVw(16)};
  padding-left: ${getMobileVw(20)}; // 💡 카드 시작 여백
  padding-right: ${getMobileVw(20)};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`
