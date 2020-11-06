import React from 'react'
import { useContentShareControls, useContentShareState } from 'amazon-chime-sdk-component-library-react'
import { PopOverItemProps } from 'amazon-chime-sdk-component-library-react/lib/components/ui/PopOver/PopOverItem'
import { Button } from '@material-ui/core'

import { PresentIcon } from 'assets'

interface Props {
  label?: string
  pauseLabel?: string
  unpauseLabel?: string
}

export const CustomContentShareControl: React.FC<Props> = ({
  label = 'Content',
  pauseLabel = 'Pause',
  unpauseLabel = 'Unpause'
}) => {
  const { isLocalUserSharing } = useContentShareState()
  const { paused, toggleContentShare, togglePauseContentShare } = useContentShareControls()

  const dropdownOptions: PopOverItemProps[] = [
    {
      children: <span>{paused ? unpauseLabel : pauseLabel}</span>,
      onClick: togglePauseContentShare
    }
  ]

  return (
    <Button
      className='present'
      onClick={toggleContentShare}
      startIcon={isLocalUserSharing ? null : <PresentIcon width={16} height={16} />}
    >
      {isLocalUserSharing ? 'Stop presenting' : 'Present now'}
    </Button>
  )
}
