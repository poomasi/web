import styled from '@emotion/styled'
import { ProfileCard } from '@pages/public/ProfileCard.tsx'
import { ProfileBadge } from '@components/badge'
import { useProfileList } from '@components/LandingPage/hooks/useProfileList.ts'
import { getMobileVw } from '@utils/responsive'
import { useSwiper } from '@components/LandingPage/hooks/useSwiper'
import { useMemo } from 'react'

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}

export function MobileProfilesSection() {
  const { selectedField, handleClickBadge, accountList, badgeList } = useProfileList()

  //페이지네이션 계산용 필터 결과 저장용
  const chunkedList = useMemo(() => {
    const filtered = selectedField === null ? accountList : accountList.filter((account) => account.field === selectedField)
    return chunkArray(filtered, 3)
  }, [accountList, selectedField])
  // const filteredForPagination = useMemo(() => {
  //   return selectedField === null
  //     ? accountList
  //     : accountList.filter((account) => account.field === selectedField)
  // }, [accountList, selectedField])

  // 실제 보여주는 리스트
  const { swiperRef, currentPage, totalPages } = useSwiper(chunkedList.length)

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

      <PaginationBox>
        {currentPage} / {totalPages}
      </PaginationBox>

      <PoomProfileCardList ref={swiperRef}>
        {chunkedList.map((group, idx) => (
          <Slide key={idx}>
            {group.map((account) => (
              <ProfileCard key={account.public_id} profileData={account} />
            ))}
          </Slide>
        ))}
      </PoomProfileCardList>
    </ProfilesSectionContainer>
  )
}

const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: ${getMobileVw(16)};
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
  margin: ${getMobileVw(8)} 0 ${getMobileVw(16)};
  font-size: ${getMobileVw(13)};
  color: #888;
`

const PoomProfileCardList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: ${getMobileVw(16)};
  padding-bottom: ${getMobileVw(16)};
  width: 100%;
  /* height: 600px; */
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`
