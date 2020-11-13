import React, { useState, useEffect, useRef, useCallback } from 'react'
import YouTube from 'react-youtube'

import { Modal } from 'components/shared'
import { ConversationList } from '../chat'
import { PollDrawer } from '../videochat/PollDrawer'
import { DetailsPanel, PeoplePanel, ToolsPanel } from '../videochat/Panels'
import { Drawer, Tab, Tabs, Toolbar, Box } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
  iPhone8PlusLandscapeMediaQuery,
  iPhone8PortraitMediaQuery,
  iPhoneXLandscapeMediaQuery
} from 'helpers/styles/media-queries'

import { useAppState, useVideoChatContext, PollProvider } from 'providers'
import { graphQLQuery, graphQLSubscription } from 'graphql/helpers'
import { getSession } from 'graphql/queries'
import { onUpdateSession } from 'graphql/subscriptions'
import { ISubscriptionObject, ISession } from 'types'

import { findSessionById, Sessions } from '../../helpers'
import { ChatMessages, TabPanel } from 'components'
import { ConditionalWrapper, DialogCard } from 'components/shared'
import { ReactComponent as Logo } from 'assets/verizon-logo.svg'

export const LiveStream = ({ visible, setVisibility, streamSrc, user, users }) => {
  const classes = useStyles()
  const [qaDialogOpen, setQADialogOpen] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<number>(0)
  const [isPresenter] = useState<boolean>(false)
  const { videoChatState, dispatch } = useVideoChatContext()
  const [currentSession, setCurrentSession] = useState<ISession | null>(null)
  const setLoading = useCallback((payload: boolean) => dispatch({ type: 'SET_LOADING', payload }), [])

  let sessionUpdatedSubscription = useRef<ISubscriptionObject | null>(null)

  const updateSessionInfo = ({ onUpdateSession }) => {
    // setGlobalMute(onUpdateSession.muted)
    setCurrentSession(onUpdateSession)
    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: onUpdateSession,
        pinnedMessage: onUpdateSession.pinnedMessage
      }
    })
  }

  const getSessionInfo = async () => {
    const session = await graphQLQuery(getSession, 'getSession', { id: videoChatState.sessionId })
    setCurrentSession(session)

    dispatch({
      type: 'SET_DETAILS',
      payload: {
        session: session,
        pinnedMessage: session.pinnedMessage
      }
    })

    sessionUpdatedSubscription.current = graphQLSubscription(
      onUpdateSession,
      { id: videoChatState?.session?.id || videoChatState.sessionId },
      updateSessionInfo
    )
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
    if (videoChatState.sessionId) {
      getSessionInfo()
    }

    return () => {
      sessionUpdatedSubscription?.current?.unsubscribe()
    }
  }, [])

  const handleChange = (_, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Modal open={visible} onClose={() => setVisibility(false)}>
      <>
        <div id='live-stream-video' className={classes.liveStreamVideo}>
          <YouTube videoId={streamSrc} containerClassName={classes.youtubeContainer} />
        </div>
        <div id='live-stream-chat' className={classes.liveStreamChat}>
          <ConversationList user={user} users={users} conversationID={'8ec185f0-e5c2-423d-8164-f5439a24cf0d'} />
        </div>
      </>
    </Modal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    liveStreamVideo: {
      marginTop: 'auto',
      marginBottom: 'auto',
      height: '50%',
      width: 'calc(100% - 256px)',
      paddingBottom: '0',
      display: 'inline-block',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        display: 'block'
      },
      [iPhoneXLandscapeMediaQuery]: {
        width: '100% !important'
      },
      [iPhone8PlusLandscapeMediaQuery]: {
        width: '100% !important'
      },
      [iPhone8PortraitMediaQuery]: {
        width: '100% !important'
      }
    },
    youtubeContainer: {
      position: 'relative',
      paddingBottom: '56.25%',
      height: '0',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      [theme.breakpoints.up('sm')]: {
        paddingTop: '50%'
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: '30%'
      },
      [theme.breakpoints.up('lg')]: {
        paddingTop: '0'
      },
      [iPhoneXLandscapeMediaQuery]: {
        paddingTop: '0 !important',
        paddingBottom: '62.5% !important'
      },
      [iPhone8PlusLandscapeMediaQuery]: {
        paddingTop: '0px !important',
        paddingBottom: '62.5% !important'
      },
      [iPhone8PortraitMediaQuery]: {
        paddingTop: '0px !important',
        paddingBottom: '62.5% !important'
      },
      '& iframe': {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
      }
    },
    liveStreamChat: {
      position: 'relative',
      height: 'auto',
      width: '30%'
    }
  })
)
