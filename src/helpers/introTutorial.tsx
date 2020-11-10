import React from 'react' // required for using JSX
import { Step } from 'react-joyride'
import { IUser } from '../types'

export const introTutorialSteps: (user: IUser | undefined) => Step[] = user => {
  const steps: Step[] = [
    {
      target: 'body',
      title: (
        <>
          Welcome to 5G Innovation Sessions, <span>{user?.firstName}</span>.
        </>
      ),
      content: 'Get to know how to make the most of your experience with us.',
      disableBeacon: true,
      placement: 'center'
    },
    {
      target: '#profileDrawer',
      title: 'Main menu',
      content:
        'The menu allows you to access your profile, event info, and chat directly 1:1 with other users. You can also revisit the tutorial at any time.',
      disableBeacon: true,
      placement: 'left'
    },
    {
      target: '#countdown-display',
      title: 'Countdown',
      content:
        'We’ll be tuning in live to hear the latest from our key leaders in 5G and subject matter experts. When the timer expires it will be replaced with a link to join us for our live programming.',
      disableBeacon: true,
      placement: 'bottom'
    }
  ]
  return steps
}
