import React, { FC, useEffect, useRef, useState } from 'react'
import { useAudioVideo, useMeetingManager } from 'amazon-chime-sdk-component-library-react'
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
import { getRaisedHandsByDismissed } from 'graphql/customQueries'
import { onCreateRaisedHand, onUpdateRaisedHand } from 'graphql/subscriptions'
import { ISubscriptionObject } from 'types'

import { RaiseHandIcon } from 'assets'
import { updateRaisedHand, updateSession } from 'graphql/mutations'
import { useAppState, useVideoChatContext } from 'providers'
import { useRosterState } from 'providers/RosterProvider'

interface PeoplePanelProps {
  isAdmin?: boolean
}

export const PeoplePanel: FC<PeoplePanelProps> = ({ isAdmin }) => {
  const classes = useStyles()
  const {
    appState: { user }
  } = useAppState()
  const meetingManeger = useMeetingManager()
  const { videoChatState } = useVideoChatContext()
  const { roster } = useRosterState()
  const audioVideo = useAudioVideo()
  const rosterArray = Object.values(roster)
  const [raisedHands, setRaisedHands] = useState<any>([])
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isPinned = videoChatState?.session?.presenterPins.some(pin => pin === user?.id)

  let createSubscription = useRef<ISubscriptionObject | null>(null)
  let updateSubscription = useRef<ISubscriptionObject | null>(null)

  const raisedHandCreated = ({ onCreateRaisedHand }) => {
    setRaisedHands(prevHands => [...prevHands, onCreateRaisedHand])
  }

  const raisedHandUpdated = ({ onUpdateRaisedHand }) => {
    if (onUpdateRaisedHand.dismissed === 'true') {
      setRaisedHands(prevRaisedHands => prevRaisedHands.filter(r => r.id !== onUpdateRaisedHand.id))
    }
  }

  const getRaisedHands = async () => {
    const currentRaisedHands = await graphQLQuery(getRaisedHandsByDismissed, 'raisedHandByDismissed', {
      sessionId: videoChatState?.session?.id,
      dismissed: { eq: 'false' }
    })
    setRaisedHands(currentRaisedHands)

    createSubscription.current = graphQLSubscription(
      onCreateRaisedHand,
      { sessionId: videoChatState?.session?.id },
      raisedHandCreated
    )
    updateSubscription.current = graphQLSubscription(
      onUpdateRaisedHand,
      { sessionId: videoChatState?.session?.id },
      raisedHandUpdated
    )
  }

  useEffect(() => {
    if (videoChatState?.session?.id) {
      getRaisedHands()
    }

    return () => {
      createSubscription.current?.unsubscribe()
      updateSubscription.current?.unsubscribe()
    }
  }, [videoChatState?.session?.id])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePin = async (userId: string) => {
    if (userId) {
      await graphQLMutation(updateSession, {
        id: videoChatState?.session?.id,
        presenterPins: uniq([...(videoChatState?.session?.presenterPins || []), userId])
      })
    }
    handleClose()
  }

  const handleUnPin = async (userId: string) => {
    if (userId) {
      await graphQLMutation(updateSession, {
        id: videoChatState?.session?.id,
        presenterPins: videoChatState?.session?.presenterPins.filter(pin => pin !== userId)
      })
    }
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleUserMute = (userId: string, muted: boolean) => {
    audioVideo?.realtimeSendDataMessage('TOGGLE_PLAYER_MUTE', {
      userId: userId as string,
      muted
    })
  }

  const dismissHand = async (handId: string) => {
    await graphQLMutation(updateRaisedHand, { id: handId, dismissed: 'true' })
  }

  useEffect(() => {
    audioVideo?.realtimeSubscribeToReceiveDataMessage('TOGGLE_PLAYER_MUTE', data => {
      const muteInfo = data.json()
      if (muteInfo.userId === user?.id) {
        // initially toggle whether they can control it
        audioVideo?.realtimeSetCanUnmuteLocalAudio(!muteInfo.muted)
        if (muteInfo.muted) {
          // if muted is true then we also toggle the mute to on
          audioVideo?.realtimeMuteLocalAudio()
        }
      }
    })

    return () => {
      audioVideo?.realtimeUnsubscribeFromReceiveDataMessage('TOGGLE_PLAYER_MUTE')
    }
  }, [audioVideo])

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
              {raisedHands.map(hand => {
                const rosterUser = rosterArray.find(r => r.externalUserId === hand.userId)
                const attendeeId = rosterUser?.chimeAttendeeId
                return (
                  <ListItem disableGutters key={hand.user.id}>
                    <UserAvatarCard
                      user={hand.user}
                      isRaisedHand
                      handleMute={muted => toggleUserMute(hand.userId, muted)}
                      attendeeId={attendeeId}
                      handleDismiss={() => dismissHand(hand.id)}
                    />
                  </ListItem>
                )
              })}
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
              {isAdmin ? (
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
              ) : null}
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
