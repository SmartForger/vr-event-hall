import React from 'react' // required for using JSX
import { Step } from 'react-joyride'
import { IUser } from '../types'

export const introTutorialSteps: (user: IUser | undefined) => Step[] = user => {
  const steps: Step[] = [
    {
      target: 'body',
      title: (
        <>
          Welcome to 5G Innovation Session, <span>{user?.firstName}</span>.
        </>
      ),
      content: 'Learn how to make the most of your experience with us',
      disableBeacon: true,
      placement: 'center'
    },
    {
      target: '#profileDrawer',
      title: 'Use the top navigation bar or the side menu to navigate the experience',
      content:
        'Our side menu allows you to access your profile, event info, chat with other users and revisit this tutorial at any time from the main menu.',
      disableBeacon: true,
      placement: 'left'
    },
    {
      target: '#countdown-display',
      title: 'Countdown',
      content: 'We’ll be tuning in to hear the latest from our key leaders in 5G and subject matter experts.',
      disableBeacon: true,
      placement: 'bottom'
    }
  ]
  return steps
}
