import React, { FC } from 'react'
import Joyride, { ACTIONS, CallBackProps, STATUS, Step, Styles } from 'react-joyride'
import { JoyrideTutorialStyles } from './JoyrideTutorialStyles'

interface IntroTutorialProps {
  run: boolean
  steps: Step[]
  onClose: () => void
  styles: Styles
}

export const IntroTutorial: FC<IntroTutorialProps> = ({ run, steps, onClose, styles }) => {
  const handleJoyrideCallback = (data: CallBackProps) => {
    if (data.action === ACTIONS.CLOSE || data.status === STATUS.FINISHED) {
      onClose()
    }
  }

  return (
    <Joyride
      run={run}
      steps={steps}
      styles={styles}
      callback={handleJoyrideCallback}
      continuous={true}
      floaterProps={{ disableAnimation: true }}
      locale={{ last: 'Close' }} // Changes the "Next" button text of the final step to "Close"
    />
  )
}
