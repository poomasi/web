import styled from '@emotion/styled'
import { ProfileCard } from '@components/common/profileCards/ProfileCard'
import { ProfileBadge } from '@components/badge'
import { useProfileList } from '@components/LandingPage/hooks/useProfileList.ts'

export function ProfilesSection() {
  const { selectedField, handleClickBadge, accountList, badgeList } = useProfileList()

  return (
    <ProfilesSectionContainer id={'profiles-section'}>
      <SectionTitle>
        <SubHead>품앗이꾼</SubHead>
        <BadgeContainer>
          <ProfileBadge onClick={() => handleClickBadge(null)} badgeString={'전체'} selected={selectedField === null} />
          {badgeList.map((badge) => (
            <ProfileBadge key={badge} onClick={() => handleClickBadge(badge)} badgeString={badge} selected={badge === selectedField} />
          ))}
        </BadgeContainer>
      </SectionTitle>

      <PoomProfileCardList>
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
  width: 1320px;
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
`

const PoomProfileCardList = styled.div`
  width: 1320px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 26px;
  margin: 2rem auto 0;
`
