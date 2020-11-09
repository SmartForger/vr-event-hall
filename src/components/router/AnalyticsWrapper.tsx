import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'
import AuthBG from 'assets/entrp-welcome-bg.jpg'

import { AuthWrapper } from 'components/auth'
import { UserAuthenticatedRoutes } from './UserAuthenticatedRoutes'
import { GameWrapper } from 'UI'
import { Header } from 'components'
import { VimeoLiveStream } from 'components/livestream'

export const AnalyticsWrapper = ({ user, setUser, eventStage, streamStartTime, useBackupStream }) => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.initialize('UA-178694733-3')
  }, [])
  useEffect(() => {
    ReactGA.pageview(location.pathname)
  }, [location])
  return (
    <Switch>
      <Route exact path='/'>
        <AuthWrapper backgroundImage={AuthBG} setUser={setUser} />
      </Route>
      <Route exact path='/stream'>
        <VimeoLiveStream useBackupStream={useBackupStream} user={user} eventStage={eventStage} />
      </Route>
      <UserAuthenticatedRoutes user={user} setUser={setUser}>
        <Route exact path='/event'>
          <GameWrapper user={user} eventStage={eventStage} streamStartTime={streamStartTime} />
        </Route>
      </UserAuthenticatedRoutes>
    </Switch>
  )
}
