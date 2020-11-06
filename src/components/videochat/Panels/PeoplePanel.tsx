import React, { FC, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, IconButton, List, ListItem, makeStyles, Theme, Typography } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'

import { UserAvatarCard } from 'components'

import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getSessionRaisedHands } from 'graphql/customQueries'
import { onCreateRaisedHand } from 'graphql/subscriptions'
import { ISubscriptionObject } from 'types'

import { RaiseHandIcon } from 'assets'

interface PeoplePanelProps {
  isAdmin?: boolean
  sessionId?: string
}

export const PeoplePanel: FC<PeoplePanelProps> = ({ isAdmin, sessionId }) => {
  const classes = useStyles()
  const [raisedHands, setRaisedHands] = useState<any>([])

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
            alt={`Bryan Press`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
            className={classes.avatar}
          />
          <div className={classes.userInfo}>
            <div className={classes.userActivityCircle} />
            <Typography variant='body1' component='p' align='center'>
              Bryan Press
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
        <div className={classes.user}>
          <Avatar
            alt={`Ana Stanton`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
            className={classes.avatar}
          />
          <div className={classes.userInfo}>
            <div className={classes.userActivityCircle} />
            <Typography variant='body1' component='p' align='center'>
              Ana Stanton
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
            alt={`Davis Dorwart`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
            className={classes.avatar}
          />
          <div className={classes.userInfo}>
            <div className={classes.userActivityCircle} />
            <Typography variant='body1' component='p' align='center'>
              Davis Dorwart
            </Typography>
            <div className={classes.moreButton}>
              <IconButton onClick={() => console.log('MORE')}>
                <MoreHoriz />
              </IconButton>
            </div>
          </div>
        </div>
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
