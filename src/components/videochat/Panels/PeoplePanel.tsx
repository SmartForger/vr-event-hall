import React, { FC, useEffect, useRef, useState } from 'react'
import { useRosterState } from 'amazon-chime-sdk-component-library-react'
import { uniq } from 'lodash'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Typography
} from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'

import { UserAvatarCard } from 'components'

import { graphQLMutation, graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getSessionRaisedHands } from 'graphql/customQueries'
import { onCreateRaisedHand } from 'graphql/subscriptions'
import { ISubscriptionObject } from 'types'

import { RaiseHandIcon } from 'assets'
import { updateSession } from 'graphql/mutations'
import { useAppState, useVideoChatContext } from 'providers'

interface PeoplePanelProps {
  isAdmin?: boolean
  sessionId?: string
}

export const PeoplePanel: FC<PeoplePanelProps> = ({ isAdmin, sessionId }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const { videoChatState } = useVideoChatContext()
  const { roster } = useRosterState()
  const rosterArray = Object.values(roster)
  const [raisedHands, setRaisedHands] = useState<any>([])
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isPinned = videoChatState?.session?.presenterPins.some(pin => pin === user?.id)

  let subscription = useRef<ISubscriptionObject | null>(null)

  const updateRaisedHands = ({ onCreateRaisedHand }) => {
    setRaisedHands(prevHands => [...prevHands, onCreateRaisedHand])
  }

  const getRaisedHands = async () => {
    const currentRaisedHands = await graphQLQuery(getSessionRaisedHands, 'getSession', { id: sessionId })
    setRaisedHands(currentRaisedHands.raisedHands.items)

    subscription.current = graphQLSubscription(onCreateRaisedHand, { sessionId }, updateRaisedHands)
  }

  useEffect(() => {
    if (sessionId) {
      getRaisedHands()
    }
  }, [sessionId])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePin = async (userId: string) => {
    if (userId) {
      await graphQLMutation(updateSession, {
        id: videoChatState.sessionId,
        presenterPins: uniq([...(videoChatState?.session?.presenterPins || []), userId])
      })
    }
    handleClose()
  }

  const handleUnPin = async (userId: string) => {
    if (userId) {
      await graphQLMutation(updateSession, {
        id: videoChatState.sessionId,
        presenterPins: videoChatState?.session?.presenterPins.filter(pin => pin !== userId)
      })
    }
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {isAdmin ? (
        <div className={classes.details}>
          <Box
            bgcolor='#2188CE'
            color='white'
            display='flex'
            height='50px'
            justifyContent='space-around'
            alignItems='center'
          >
            <Typography variant='subtitle1' className={`${classes.bold} ${classes.raiseHandTitle}`} gutterBottom>
              These people raise their hand
            </Typography>
            <RaiseHandIcon fill='white' />
          </Box>
          <Box>
            <List className={classes.handsList}>
              {raisedHands.map(hand => (
                <ListItem disableGutters>
                  <UserAvatarCard user={hand.user} isRaisedHand />
                </ListItem>
              ))}
            </List>
            {
              <Box display='flex' justifyContent='center' alignItems='center' marginBottom={2}>
                {raisedHands.length > 0 ? (
                  <Button className={classes.clearAll}>Clear all</Button>
                ) : (
                  <Typography variant='subtitle2'>No hands yet</Typography>
                )}
              </Box>
            }
          </Box>
        </div>
      ) : null}
      <section className={!isAdmin ? classes.listContainer : ''}>
        <div className={classes.user}>
          <Avatar
            alt={`Amber George`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
            className={classes.avatar}
          />
          <div className={classes.userInfo}>
            <div className={classes.userActivityCircle} />
            <Typography variant='body1' component='p' align='center'>
              Amber George
              <Typography variant='caption' className={classes.userType}>
                (Presenter)
              </Typography>
            </Typography>
            <div className={classes.moreButton}>
              <IconButton onClick={() => console.log('MORE')}>
                <MoreHoriz />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={classes.user}>
          <Avatar
            alt={`Cheyenne Levin`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
            className={classes.avatar}
          />
          <div className={classes.userInfo}>
            <div className={classes.userActivityCircle} />
            <Typography variant='body1' component='p' align='center'>
              Cheyenne Levin
              <Typography variant='caption' className={classes.userType}>
                (Moderator)
              </Typography>
            </Typography>
            <div className={classes.moreButton}>
              <IconButton onClick={() => console.log('MORE')}>
                <MoreHoriz />
              </IconButton>
            </div>
          </div>
        </div>
        {rosterArray.map(user => (
          <div className={classes.user}>
            <Avatar
              alt={user.name}
              src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
              className={classes.avatar}
            />
            <div className={classes.userInfo}>
              <div className={classes.userActivityCircle} />
              <Typography variant='body1' component='p' align='center'>
                {user.name}
              </Typography>
              <div className={classes.moreButton}>
                <IconButton onClick={handleClick}>
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id={`${user.externalUserId}-menu`}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {!isPinned ? (
                    <MenuItem onClick={() => handlePin(user.externalUserId || '')}>Pin Video</MenuItem>
                  ) : (
                    <MenuItem onClick={() => handleUnPin(user.externalUserId || '')}>Unpin Video</MenuItem>
                  )}
                  <MenuItem onClick={handleClose}>Cancel</MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        ))}
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
