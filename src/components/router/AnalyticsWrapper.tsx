import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'
import { AuthWrapper } from 'components/auth'
import AuthBG from 'assets/entrp-welcome-bg.jpg'

export const AnalyticsWrapper = ({ setUser }) => {
  const location = useLocation()
  useEffect(() => {
    ReactGA.initialize('UA-178694733-8')
  }, [])
  useEffect(() => {
    ReactGA.pageview(location.pathname)
  }, [location])
  return (
    <Switch>
      <Route exact path='/'>
        <AuthWrapper backgroundImage={AuthBG} setUser={setUser} />
      </Route>
      {/*<UserAuthenticatedRoutes user={user} setUser={setUser}>*/}
      {/*  <Route exact path='/event'>*/}
      {/*    <Header />*/}
      {/*    <GameWrapper user={user} />*/}
      {/*  </Route>*/}
      {/*</UserAuthenticatedRoutes>*/}
    </Switch>
  )
}
