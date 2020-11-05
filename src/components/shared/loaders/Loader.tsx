import React from 'react'
import { ReactComponent as Logo } from '../../../assets/verizon-logo.svg'

export const Loader = props => {
  return (
    <div id='loadingpage'>
      <Logo />
      <div className='lds-ring'>
        <div />
        <div />
        <div />
        <div />
      </div>
      <span id='loadingpage-text'>Now loading 5G Innovation Sessions</span>
    </div>
  )
}
