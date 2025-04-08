import styled from '@emotion/styled'
import { ProfileCard } from '@pages/public/ProfileCard.tsx'
import { ProfileBadge } from '@components/badge'
import { useProfileList } from '@components/LandingPage/hooks/useProfileList.ts'
import { getMobileVh, getMobileVw } from '@utils/responsive'
import { useSwiper } from '@components/LandingPage/hooks/useSwiper'
import { useMemo } from 'react'

export function MobileProfilesSection() {
  const { selectedField, handleClickBadge, accountList, badgeList } = useProfileList()

  //페이지네이션 계산용 필터 결과 저장용
  const filteredForPagination = useMemo(() => {
    return selectedField === null
      ? accountList
      : accountList.filter((account) => account.field === selectedField)
  }, [accountList, selectedField])

  // 실제 보여주는 리스트
  const { swiperRef, currentPage, totalPages } = useSwiper(filteredForPagination.length)

  return (
    <ProfilesSectionContainer>
      <SectionTitle>
        <SubHead>품앗이꾼</SubHead>
        <BadgeContainer>
          <ProfileBadge onClick={() => handleClickBadge(null)} badgeString={'전체'} selected={selectedField === null} />
          {badgeList.map((badge) => (
            <ProfileBadge key={badge} onClick={() => handleClickBadge(badge)} badgeString={badge} selected={badge === selectedField} />
          ))}
        </BadgeContainer>
      </SectionTitle>
      <PaginationBox>{currentPage} / {totalPages}</PaginationBox>

      <PoomProfileCardList ref={swiperRef}>
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
      </PoomProfileCardList>
    </ProfilesSectionContainer>
  )
}




const ProfilesSectionContainer = styled.div`
  margin: 160px auto 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  gap: 26px;
`

const SubHead = styled.div`
  color: #0e0e0e;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
`

const BadgeContainer = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 375px) {
    width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
  }
`

const PoomProfileCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${getMobileVh(5)};
  /* margin: 2rem auto 0; */
`
