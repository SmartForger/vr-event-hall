import { makeStyles, Typography } from '@material-ui/core'
import { useChatContext } from 'providers'
import React from 'react'
import { UserAvatarCard } from './UserAvatarCard'

export const DetailsPanel = () => {
  const classes = useStyles()
  const { chatState } = useChatContext()

  return (
    <div>
      <div className={classes.description}>
        <Typography variant='body1'>Demo Info</Typography>
        <Typography variant='subtitle1'>{chatState?.session?.description}</Typography>
      </div>
      {chatState?.session?.admins?.items && chatState?.session?.admins?.items.length > 0 ? (
        <div className={classes.experts}>
          <Typography variant='body1'>Subject Matter Experts</Typography>
          {chatState?.session?.admins.items
            .filter(a => a.userType === 'sme')
            .map(admin => (
              <UserAvatarCard user={admin.user} />
            ))}
        </div>
      ) : null}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  description: {
    color: 'black',
    padding: '16px',
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
      marginBottom: '16px'
    }
  },
  experts: {
    color: 'black',
    padding: '16px',
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
      marginBottom: '16px'
    }
  }
}))
