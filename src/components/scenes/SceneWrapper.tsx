import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Connect, ContactForm } from 'components'
import { ExploreScene, WelcomeScene } from './index'
import { GameFlowSteps, IUser, IDemo, ETouchpoints, EventStages } from 'types'
import { Demo } from '../demo'
import { Touchpoints } from '../touchpoints'
import { ISession } from '../../helpers'
import { Session } from '../session'

interface ISceneWrapper {
  backgroundImage?: string
  drawerOpen?: boolean
  hideExploreText: boolean
  hideSessionsText: boolean
  activeScene: GameFlowSteps
  prevScene: GameFlowSteps
  activeDemo: IDemo
  activeSession: ISession
  activeTouchpoint: ETouchpoints
  changeScene: (sceneTo: GameFlowSteps) => void
  changeActiveTouchpoint: (part: ETouchpoints) => void
  user?: IUser
  setErrorMessage: (message: string | null) => void
  setSuccessMessage: (message: string | null) => void
  eventStage?: EventStages
}
export const SceneWrapper: FC<ISceneWrapper> = ({
  user,
  prevScene,
  drawerOpen,
  activeDemo,
  activeScene,
  activeSession,
  hideExploreText,
  activeTouchpoint,
  hideSessionsText,
  changeScene,
  changeActiveTouchpoint,
  setSuccessMessage,
  setErrorMessage,
  eventStage
}) => {
  const [transition, setTransition] = useState<boolean>(true)
  const [previousState, setPreviousState] = useState<GameFlowSteps>(activeScene)
  const queryParams = new URLSearchParams(useLocation().search)

  useEffect(() => {
    // Uncomment if we need to use query params to set the auth state
    const authParam = queryParams.get('auth')
    if (authParam) {
      // Uncomment if we need to use query params to set the auth state
      // setSceneState(authParam as E2DScenes)
    }
    return () => {}
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const welcomeScene = [GameFlowSteps.Welcome, GameFlowSteps.Intro, GameFlowSteps.Connect]

    if (welcomeScene.includes(activeScene) && welcomeScene.includes(previousState)) {
      setTransition(false)
    } else {
      setTransition(true)
    }

    setPreviousState(activeScene)
    // eslint-disable-next-line
  }, [activeScene])

  return (
    <>
      {(activeScene === GameFlowSteps.Welcome || activeScene === GameFlowSteps.Intro) && (
        <WelcomeScene
          setGameState={changeScene}
          activeScene={activeScene}
          user={user}
          setScene={changeScene}
          transition={transition}
        />
      )}
      {(activeScene === GameFlowSteps.Explore || activeScene === GameFlowSteps.BackToExplore) && (
        <ExploreScene hideText={hideExploreText} sceneType={activeScene} setScene={changeScene} prevScene={prevScene} />
      )}
      {(activeScene === GameFlowSteps.Sessions || activeScene === GameFlowSteps.BackToSessions) && (
        <ExploreScene
          hideText={hideSessionsText}
          sceneType={activeScene}
          setScene={changeScene}
          prevScene={prevScene}
        />
      )}
      {activeScene === GameFlowSteps.Robot && (
        <Touchpoints
          setScene={changeScene}
          demo={activeDemo}
          activeTouchpoint={activeTouchpoint}
          changeActiveTouchpoint={changeActiveTouchpoint}
        />
      )}
      {activeScene === GameFlowSteps.Connect && (
        <Connect
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          transition={transition}
          user={user}
        />
      )}
      {activeScene === GameFlowSteps.Demo && <Demo setScene={changeScene} demo={activeDemo} user={user} />}
      {activeScene === GameFlowSteps.Session && (
        <Session setScene={changeScene} session={activeSession} eventStage={eventStage} />
      )}
    </>
  )
}
