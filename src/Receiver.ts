import { toast } from 'react-toastify'
import { Demos } from './helpers/demos'
import { GameFlowSteps, ETouchpoints, E3DDemoNameVals } from './types'
import { Sessions } from './helpers'
import { createUserInteraction } from './graphql/mutations'
import { graphQLMutation } from './graphql/helpers'

export default class Receiver {
  static init(
    onSceneSetup: () => void,
    setHideExploreText,
    setHideSessionsText,
    setGameState,
    setActiveDemo,
    setActiveSession,
    setActiveRobotPart,
    setModalConfig,
    setShowModal,
    setConversationId,
    user
  ) {
    let hideTextExplore = false
    let hideTextSessions = false
    let activeScene

    window.addEventListener(
      'message',
      e => {
        try {
          const JSONdata = JSON!.parse(e.data)
          if (JSONdata!.dragValue) {
            if (activeScene === GameFlowSteps.Explore && !hideTextExplore && Number(JSONdata!.dragValue) > 0.05) {
              hideTextExplore = true
              setHideExploreText(true)
            } else if (activeScene === GameFlowSteps.Explore && hideTextExplore && Number(JSONdata!.dragValue) < 0.05) {
              hideTextExplore = false
              setHideExploreText(false)
            } else if (
              activeScene === GameFlowSteps.Sessions &&
              !hideTextSessions &&
              Number(JSONdata!.dragValue) > 0.05
            ) {
              hideTextSessions = true
              setHideSessionsText(true)
            } else if (
              activeScene === GameFlowSteps.Sessions &&
              hideTextSessions &&
              Number(JSONdata!.dragValue) < 0.05
            ) {
              hideTextSessions = false
              setHideSessionsText(false)
            }
            return
          }

          switch (JSONdata!.command) {
            case 'initialised':
              if (!!onSceneSetup) {
                onSceneSetup()
              }
              break
            case 'about':
              setModalConfig({ type: 'about' })
              setShowModal(true)
              graphQLMutation(createUserInteraction, {
                name: JSON.stringify('about'),
                trigger: 'modal',
                type: 'about',
                userId: user?.id
              })
              break
            case 'support':
              setModalConfig({ type: 'support' })
              setShowModal(true)
              break
            case 'connect':
              setModalConfig({ type: JSONdata!.command, demo: JSONdata!.param })
              setShowModal(true)
              break
            case 'chat':
              setConversationId(JSONdata!.param)
              break
            case 'demos':
              let newDemo
              switch (JSONdata!.param) {
                case E3DDemoNameVals.mecExplainer:
                  newDemo = Demos.mecExplainer
                  break
                case E3DDemoNameVals.fiveGCoverage:
                  newDemo = Demos['5GCoverage']
                  break
                case E3DDemoNameVals.shotTracker:
                  newDemo = Demos.shotTracker
                  break
                case E3DDemoNameVals.tata:
                  newDemo = Demos.tata
                  break
                case E3DDemoNameVals.avesha:
                  newDemo = Demos.avesha
                  break
                case E3DDemoNameVals.ybvr:
                  newDemo = Demos.ybvr
                  break
                case E3DDemoNameVals.indy:
                  newDemo = Demos.indy
                  break
                case E3DDemoNameVals.fiveStatesOfReady:
                  newDemo = Demos['5StatesOfReady']
                  break
                case E3DDemoNameVals.crowdVision:
                  newDemo = Demos.crowdVision
                  break
                case E3DDemoNameVals.sot:
                  newDemo = Demos.sot
                  break
                case E3DDemoNameVals.iceMobility:
                case E3DDemoNameVals.zixi:
                  // TODO: Setu demos for two above
                  // defaulting to sot
                  newDemo = Demos.sot
                  break
              }
              if (newDemo) {
                graphQLMutation(createUserInteraction, {
                  name: JSONdata!.param,
                  trigger: 'demo',
                  type: 'demo',
                  userId: user?.id
                })
                setActiveDemo(newDemo)
                setGameState(GameFlowSteps.Demo)
              }
              break
            case 'robot':
              let activeRoboPart: ETouchpoints
              switch (JSONdata!.param) {
                case '1':
                  activeRoboPart = ETouchpoints.RobotFrontArms
                  break
                case '2':
                  activeRoboPart = ETouchpoints.RobotMiddle
                  break
                case '3':
                  activeRoboPart = ETouchpoints.RobotScannerBox
                  break
                default:
                  activeRoboPart = ETouchpoints.None
                  break
              }
              if (activeRoboPart) {
                graphQLMutation(createUserInteraction, {
                  name: activeRoboPart,
                  trigger: 'robot',
                  type: 'touchpoints',
                  userId: user?.id
                })
                setGameState(GameFlowSteps.Robot)
                setActiveRobotPart(activeRoboPart)
              }
              break
            case 'sessions':
              let newSession
              switch (JSONdata!.param) {
                case '1':
                  newSession = Sessions.publicAndPrivateMEC
                  break
                case '2':
                  newSession = Sessions['5GBusiness']
                  break
                case '3':
                  newSession = Sessions.IOT
                  break
                case '4':
                  newSession = Sessions['5GSmallBusiness']
                  break
                case '5':
                  newSession = Sessions.ctia
                  break
                case '6':
                  newSession = Sessions.venues
                  break
                // case '7':
                //   newSession = Sessions.nyt
                //   break
                // case '8':
                //   newSession = Sessions.crowdVision
                //   break
              }
              if (newSession) {
                graphQLMutation(createUserInteraction, {
                  name: JSONdata!.param,
                  trigger: 'sessions',
                  type: 'sessions',
                  userId: user?.id
                })
                setActiveSession(newSession)
                setGameState(GameFlowSteps.Session)
              }

              break
            case 'location':
              activeScene = JSONdata!.param
              break
            default:
              return
          }
        } catch (e) {
          // handle error?
        }
      },
      false
    )
  }
}
