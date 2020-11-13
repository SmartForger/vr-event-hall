import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'
import AuthBG from 'assets/entrp-welcome-bg.jpg'

import { AuthWrapper } from 'components/auth'
import { UserAuthenticatedRoutes } from './UserAuthenticatedRoutes'
import { RosterProvider } from 'providers/RosterProvider'
import { GameWrapper } from 'UI'
import { Header } from 'components'
import { VimeoLiveStream } from 'components/livestream'

export const AnalyticsWrapper = ({ user, setUser, eventStage, streamStartTime, useBackupStream, vcOff }) => {
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
      <UserAuthenticatedRoutes user={user} setUser={setUser}>
        <Route exact path='/stream'>
          <RosterProvider>
            <VimeoLiveStream useBackupStream={useBackupStream} user={user} eventStage={eventStage} />
          </RosterProvider>
        </Route>
        <Route exact path='/event'>
          <GameWrapper user={user} eventStage={eventStage} streamStartTime={streamStartTime} vcOff={vcOff} />
        </Route>
      </UserAuthenticatedRoutes>
    </Switch>
  )
}
