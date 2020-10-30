import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MeetingProvider, NotificationProvider, darkTheme } from 'amazon-chime-sdk-component-library-react'
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { I18n } from 'aws-amplify'
// Components
import { Notifications, Footer } from 'components'
import { GameWrapper } from 'UI'
// Helpers
import { store } from 'configs'
import { dict } from 'i18n'
import { IUser } from 'types'
import { theme } from 'helpers'
import { AnalyticsWrapper } from './components/router/AnalyticsWrapper'

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
                    <AnalyticsWrapper setUser={setUser} />
                    <Redirect from='*' to='/' />
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
