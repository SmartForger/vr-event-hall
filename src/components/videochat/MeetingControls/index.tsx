import React, { FC } from 'react'
import { ControlBar, useUserActivityState } from 'amazon-chime-sdk-component-library-react'
import { useTheme } from '@material-ui/core'

import { EndMeetingControl } from '../EndMeetingControl'
import { CustomControlBarButton, StyledControls } from './Styled'
import { CustomAudioInputControl } from './CustomAudioInputControl'
import { CustomVideoInputControl } from './CustomVideoInputControl'
import { CustomContentShareControl } from './CustomContentShareControl'
import { CustomRaiseHandControl } from './CustomRaiseHandControl'

import { useVideoChatContext } from 'providers'
import { graphQLMutation } from 'graphql/helpers'
import { updateSession } from 'graphql/mutations'
import { ToggleDrawer } from 'types'

import { ChatIcon, SpeakerMuteIcon } from 'assets'

interface MeetingControlProps {
  setVisible: (val: boolean) => void
  isPresenter?: boolean
  isClassroom?: boolean
  toggleDrawer?: ToggleDrawer
}

const MeetingControls: FC<MeetingControlProps> = ({ setVisible, isPresenter, isClassroom, toggleDrawer }) => {
  const { isUserActive } = useUserActivityState()
  // TODO keep in state
  const { videoChatState } = useVideoChatContext()
  const theme = useTheme()

  const toggleMuteAll = async () => {
    return graphQLMutation(updateSession, {
      id: videoChatState.sessionId,
      muted: !videoChatState.globalMute
    })
  }

  return (
    <StyledControls className='controls' active={!!isUserActive} totalControls={isPresenter ? 4 : 5}>
      <ControlBar className='controls-menu' layout='undocked-horizontal' showLabels={false}>
        <CustomAudioInputControl />
        <CustomControlBarButton
          icon={<ChatIcon width={16} height={16} />}
          onClick={() => toggleDrawer && toggleDrawer(null, 'rightPersistent', true)}
          label='Chat'
        />
        {isClassroom && !isPresenter ? <CustomRaiseHandControl sessionId={videoChatState.sessionId} /> : null}
        <CustomVideoInputControl />
        <EndMeetingControl setVisible={setVisible} isPresenter={isPresenter} />
        <section className='controls-menu-right'>
          {(isClassroom && isPresenter) || !isClassroom ? <CustomContentShareControl /> : null}
          {isClassroom && isPresenter ? (
            <CustomControlBarButton
              icon={<SpeakerMuteIcon width={16} height={16} fill={videoChatState.globalMute ? 'white' : 'black'} />}
              onClick={toggleMuteAll}
              backgroundColor={videoChatState.globalMute ? theme.palette.error.main : 'white'}
              label='Mute All'
            />
          ) : null}
        </section>
      </ControlBar>
    </StyledControls>
  )
}

export default MeetingControls
