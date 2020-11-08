import React from 'react' // required for using JSX
import { Step } from 'react-joyride'

export const sessionTutorialSteps: Step[] = [
  {
    target: 'body',
    title: 'Navigating content',
    content:
      'Click and drag the monolith carousel to the left to explore 5G with Verizon and our partners.' +
      ' Find a topic that interests you? Click that monolith to learn more about it through videos,' +
      ' interactive models, polls and more.',
    disableBeacon: true,
    placement: 'center',
    hideBackButton: true
  }
]
