import React, { FC, useEffect, useState } from 'react'
import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'

import { IParticipant } from 'types'

import { useAppState, useVideoChatContext } from 'providers'
import { CustomAttendee } from 'providers/RosterProvider'

interface PeoplePanelProps {
  isAdmin?: boolean
}

export const LiveStreamPeoplePanel: FC<PeoplePanelProps> = ({ isAdmin }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { videoChatState } = useVideoChatContext()
  const [participants, setParticipants] = useState<CustomAttendee[]>([])

  useEffect(() => {
    const customRoster: CustomAttendee[] =
      videoChatState?.session?.participants?.items.map((person: IParticipant) => {
        return {
          chimeAttendeeId: '',
          externalUserId: person.userId,
          email: person.user.email,
          avatar: person.user.avatar,
          name: `${person.user.firstName} ${person.user.lastName}`
        } as CustomAttendee
      }) || []

    setParticipants(customRoster)
  }, [videoChatState?.session?.participants])

  const [anchorEl, setAnchorEl] = React.useState(null)

  return (
    <>
      <section className={!isAdmin ? classes.listContainer : ''}>
        {participants
          .filter(r => videoChatState.session?.admins.items.some(a => a.userId === r.externalUserId))
          .map(rosterUser => {
            const adminUser = videoChatState.session?.admins.items.find(a => a.userId === rosterUser.externalUserId)
            return (
              <div className={classes.user}>
                <Avatar
                  alt={rosterUser.name}
                  src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
                  className={classes.avatar}
                />
                <div className={classes.userInfo}>
                  <div className={classes.userActivityCircle} />
                  <Typography variant='body1' component='p' align='center'>
                    {rosterUser.name}
                    <Typography variant='caption' className={classes.userType}>
                      ({adminUser?.userType === 'sme' ? 'Presenter' : 'Moderator'})
                    </Typography>
                  </Typography>
                </div>
              </div>
            )
          })}
        {participants
          .filter(r => !videoChatState.session?.admins?.items?.some?.(a => a.userId === r.externalUserId))
          .map(rosterUser => {
            return (
              <div className={classes.user}>
                <Avatar
                  alt={rosterUser.name}
                  src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
                  className={classes.avatar}
                />
                <div className={classes.userInfo}>
                  <div className={classes.userActivityCircle} />
                  <Typography variant='body1' component='p' align='center'>
                    {rosterUser.name}
                  </Typography>
                </div>
              </div>
            )
          })}
      </section>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  details: {
    color: 'black',
    borderBottom: '1px solid lightgray',
    backgroundColor: '#F6F6F6'
  },
  bold: {
    fontWeight: 'bold'
  },
  avatar: {
    width: '36px',
    height: '36px',
    fontSize: '1.5rem',
    marginLeft: '16px',
    marginRight: '16px'
  },
  user: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'black',
    marginBottom: '8px',
    width: '100%'
  },
  userInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    '& .MuiTypography-body1': {
      fontWeight: 300
    }
  },
  userActivityCircle: {
    backgroundColor: theme.palette.success.main,
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginRight: '16px'
  },
  userType: {
    color: '#767676',
    marginLeft: 4
  },
  moreButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 16,
    '& .MuiIconButton-root': {
      color: 'black'
    }
  },
  raiseHandTitle: {
    marginBottom: 0
  },
  muteIcon: {
    padding: 4,
    border: '1px solid black',
    height: 23,
    width: 23
  },
  dismissIcon: {
    padding: 6
  },
  clearAll: {
    border: '1px solid black',
    borderRadius: 16,
    textTransform: 'none',
    padding: '2px 18px'
  },
  listContainer: {
    paddingTop: 8
  },
  handsList: {
    maxHeight: '300px',
    overflow: 'scroll'
  }
}))
