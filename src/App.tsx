import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MeetingProvider, NotificationProvider, darkTheme } from 'amazon-chime-sdk-component-library-react'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { I18n } from 'aws-amplify'
// Components
import { UserAuthenticatedRoutes, AuthWrapper, Notifications, Header, Footer } from 'components'
import { GameWrapper } from 'UI'
// Helpers
import { store } from 'configs'
import { dict } from 'i18n'
import { IUser } from 'types'
import { theme } from 'helpers'
import AuthBG from 'assets/entrp-welcome-bg.jpg'

I18n.putVocabularies(dict)

// Init
const App = () => {
  const [user, setUser] = useState<IUser>()
  useEffect(() => {
    I18n.setLanguage('en')
  }, [])

  return (
    <React.StrictMode>
      <Provider store={store}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={darkTheme}>
              <NotificationProvider>
                <Notifications />
                <MeetingProvider>
                  <Router>
                    <Switch>
                      <Route exact path='/'>
                        <AuthWrapper backgroundImage={AuthBG} setUser={setUser} />
                      </Route>
                      <UserAuthenticatedRoutes user={user} setUser={setUser}>
                        <Route exact path='/event'>
                          <Header />
                          <GameWrapper user={user} />
                        </Route>
                      </UserAuthenticatedRoutes>
                    </Switch>
                  </Router>
                  <Footer />
                </MeetingProvider>
              </NotificationProvider>
            </StyledThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App
