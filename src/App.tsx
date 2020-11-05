import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MeetingProvider, NotificationProvider, darkTheme } from 'amazon-chime-sdk-component-library-react'
import { ThemeProvider as MuiThemeProvider, StylesProvider, CssBaseline } from '@material-ui/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { I18n } from 'aws-amplify'

// Components
import { RotateDevice, Notifications } from 'components'

// Helpers
import { store } from 'configs'
import { dict } from 'i18n'
import { defaultEventConfigs, Environments, EventStages, IUser } from 'types'
import { theme } from 'helpers'
import { AppStateProvider } from 'providers'
import { graphQLQuery, graphQLSubscription } from './graphql/helpers'
import { onUpdateEventConfig } from './graphql/subscriptions'
import { getEventConfig } from './graphql/queries'
import { AnalyticsWrapper } from './components/router/AnalyticsWrapper'

I18n.putVocabularies(dict)

// Init
const App = () => {
  const [user, setUser] = useState<IUser>()
  const [eventConfig, setEventConfig] = useState<any>(defaultEventConfigs[getEnvironment()])
  const [eventStage, setEventStage] = useState<EventStages>(EventStages.REGISTRATION)
  const [useBackupStream, setUseBackupStream] = useState<boolean>(false)
  const [streamStartTime, setStreamStartTime] = useState<string | undefined>()
  let subscription

  function getEnvironment() {
    const domain = window.location.hostname

    if (/innovationsessions/i.test(domain) || /master\..*\.amplifyapp/i.test(domain)) {
      return Environments.PROD
    } else if (/staging\..*\.amplifyapp/i.test(domain)) {
      return Environments.STAGING
    } else if (/dev\..*\.amplifyapp/i.test(domain)) {
      return Environments.DEV
    } else if (/qa\..*\.amplifyapp/i.test(domain)) {
      return Environments.QA
    } else {
      return Environments.LOCAL
    }
  }

  const getEventConfiguration = async () => {
    if (!eventConfig.attempts || eventConfig.attempts < 3) {
      try {
        const eventConfigData = await graphQLQuery(getEventConfig, 'getEventConfig', { id: eventConfig.id })
        setEventConfig({ ...eventConfigData })
        setStreamStartTime(eventConfigData.streamStartTime)
        setEventStage(eventConfigData.stage)
        setUseBackupStream(eventConfigData.useBackupStream)
      } catch (err) {
        console.error('Error getting event config', err)
      }
    }
  }

  const setupEventConfigSub = async () => {
    if (subscription && subscription.unsubscribe && typeof subscription.unsubscribe === 'function') {
      subscription.unsubscribe()
    }
    subscription = graphQLSubscription(onUpdateEventConfig, { id: eventConfig.id }, async config => {
      await getEventConfiguration()
    })
  }

  useEffect(() => {
    I18n.setLanguage('en')
    getEventConfiguration()
    setupEventConfigSub()
  }, [])

  return (
    <React.StrictMode>
      <AppStateProvider>
        <Provider store={store}>
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
              <StyledThemeProvider theme={darkTheme}>
                <CssBaseline />
                <RotateDevice />
                <NotificationProvider>
                  <Notifications />
                  <MeetingProvider>
                    <Router>
                      <AnalyticsWrapper
                        user={user}
                        setUser={setUser}
                        eventStage={eventStage}
                        streamStartTime={streamStartTime}
                        useBackupStream={useBackupStream}
                      />
                    </Router>
                  </MeetingProvider>
                </NotificationProvider>
              </StyledThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
        </Provider>
      </AppStateProvider>
    </React.StrictMode>
  )
}

export default App
