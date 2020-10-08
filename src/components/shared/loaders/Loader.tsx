import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ReactComponent as MVRKLogo } from '../../../assets/mvrkwhite.svg'

export const Loader = props => {
  return (
    <div id='loadingpage'>
      <MVRKLogo />
      {props?.loaderOptions ? (
        <CircularProgress
          size={300}
          thickness={1}
          value={props?.loaderOptions?.percentLoaded}
          variant={'determinate'}
        />
      ) : (
        <CircularProgress size={300} thickness={1} />
      )}
    </div>
  )
}
