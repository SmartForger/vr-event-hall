import React from 'react' // required for using JSX
import { Step } from 'react-joyride'

export const sessionTutorialSteps: Step[] = [
  {
    target: 'body',
    title: 'Navigating content',
    content:
      'Click, drag and choose from the selection of customer stories and demos to explore 5G with Verizon.',
    disableBeacon: true,
    placement: 'center',
    hideBackButton: true
  }
]
