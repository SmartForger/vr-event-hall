// shared by IntroTutorial and SessionTutorial

import React from 'react'
import { Styles } from 'react-joyride'

const buttonStyles: React.CSSProperties = {
  borderRadius: '25px',
  border: '1px solid #000',
  outline: 'none',
  minWidth: '80px'
}

export const JoyrideTutorialStyles: Styles = {
  tooltipContainer: {
    textAlign: 'left'
  },
  tooltipTitle: {
    textAlign: 'center',
    fontFamily: 'Verizon-Bold',
    fontSize: '24px',
    marginRight: '24px'
  },
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
    alignItems: 'left',
    justifyContent: 'left'
  },
  tooltipFooterSpacer: {
    display: 'none'
  },
  tooltipContent: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left'
  }
}
