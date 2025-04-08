import styled from '@emotion/styled'
import { ProfileCard } from '@pages/public/ProfileCard.tsx'
import { ProfileBadge } from '@components/badge'
import { useProfileList } from '@components/LandingPage/hooks/useProfileList.ts'
import { getMobileVw } from '@utils/responsive'
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
  margin: ${getMobileVw(8)} 0 ${getMobileVw(16)};
  font-size: ${getMobileVw(13)};
  color: #888;
`

const PoomProfileCardList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: ${getMobileVw(16)};
  padding-bottom: ${getMobileVw(16)};
  width: 100%;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  // 👇 ProfileCard가 내부에서 div로 감싸지지 않기 때문에 직접 타겟팅
  & > * {
    flex: 0 0 calc(100% / 3);
    min-width: calc(100% / 3);
    scroll-snap-align: start;

    @media (max-width: 768px) {
      flex: 0 0 ${getMobileVw(300)};
      min-width: ${getMobileVw(300)};
    }
  }
`
