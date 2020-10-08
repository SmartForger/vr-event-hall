import React, { FC } from 'react'
import Joyride, { Styles, CallBackProps, ACTIONS, STATUS, Step } from 'react-joyride'

interface TutorialProps {
  run: boolean
  steps: Step[]
  onClose: () => void
}

const buttonStyles: React.CSSProperties = {
  borderRadius: '25px',
  border: '1px solid #000',
  outline: 'none',
  minWidth: '80px'
}

const styles: Styles = {
  buttonBack: {
    ...buttonStyles,
    backgroundColor: '#fff',
    color: '#000',
    marginLeft: 'none'
  },
  buttonNext: {
    ...buttonStyles,
    backgroundColor: '#000',
    color: '#fff'
  },
  tooltipFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipFooterSpacer: {
    display: 'none'
  }
}

export const Tutorial: FC<TutorialProps> = ({ run, steps, onClose }) => {
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
      locale={{ last: 'Done' }} // Changes the "Next" button text of the final step to "Done"
    />
  )
}
