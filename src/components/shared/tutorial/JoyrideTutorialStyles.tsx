// shared by IntroTutorial and SessionTutorial

import React from 'react'
import { Styles } from 'react-joyride'
import styled from 'styled-components'

const buttonStyles: React.CSSProperties = {
  borderRadius: '25px',
  border: '1px solid #000',
  outline: 'none',
  minWidth: '80px'
}

export const JoyrideTutorialStyles: Styles = {
  options: {
    overlayColor: 'transparent'
  },
  tooltip: {
    borderRadius: 0
  },
  tooltipContainer: {
    textAlign: 'left'
  },
  tooltipTitle: {
    textAlign: 'left',
    fontFamily: 'Verizon-Bold',
    fontSize: '24px',
    paddingLeft: '10px'
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
    justifyContent: 'left',
    paddingLeft: '10px'
  },
  tooltipFooterSpacer: {
    display: 'none'
  },
  tooltipContent: {
    display: 'flex',
    justifyContent: 'left',
    textAlign: 'left',
    paddingRight: '30px',
    fontWeight: 400
  }
}
