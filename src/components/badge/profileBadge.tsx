import Button from '@mui/material/Button'
import { getMobileVh,getMobileVw } from '@utils/responsive'

interface ProfileBadgeProps {
  badgeString: string
  onClick: () => void
  selected?: boolean
}

export function ProfileBadge({ badgeString, onClick, selected }: ProfileBadgeProps) {
  return (
    <Button
      onClick={() => onClick()}
      variant="contained"
      sx={{
        marginRight: '7px',
        marginBottom: '10px',
        padding: '3px 10px',
        borderRadius: '20px',
        color: selected ? '#3ECDBA' : '#9B9EA2',
        backgroundColor: selected ? '#EBFFFC' : '#F7F7F7',
        '&:hover': {
          backgroundColor: 'var(--gray-color)',
        },
      }}
    >
      #{badgeString}
    </Button>
  )
}
