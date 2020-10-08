import React from 'react' // required for using JSX
import { Step } from 'react-joyride'
import clickdragIcon from '../assets/clickdragIcon.png'
import interactiveIcon from '../assets/interactiveContent.svg'

export const tutorialSteps: Step[] = [
  {
    target: 'body',
    title: 'Exploring the Space',
    content: (
      <div>
        <img src={clickdragIcon} alt='click and drag' />
        <p>
          Quickly navigate around each room by clicking the floor on your screen. You can rotate the camera by clicking
          and dragging with your mouse.
        </p>
      </div>
    ),
    disableBeacon: true,
    placement: 'center'
  },
  {
    target: 'body',
    title: 'Interactive Content',
    content: (
      <div>
        <img src={interactiveIcon} alt='interactive icon' />
        <p>
          We've identified interactive content within the environment using the
          <span id='inline-interactive'></span> symbol. Click the icon to view the content.
        </p>
      </div>
    ),
    disableBeacon: true,
    placement: 'center'
  },
  {
    target: '.map-marker',
    title: 'Quick Navigation',
    content:
      'Quickly transport yourself to different rooms in the environment by hovering and clicking on the room name using the stepper to the left.',
    disableBeacon: true
  },
  {
    target: '#menu-icon',
    title: 'The Menu',
    content:
      'Access your profile, event info, helpful tips & tricks and revisit this tutorial at any time from the main menu.',
    disableBeacon: true
  },
  {
    target: '#chat-icon',
    title: 'Chat Feature',
    content:
      'Check out who else is here and strike up a conversation. Event staff is also here to help with any questions you might have during your visit.',
    disableBeacon: true
  }
]
