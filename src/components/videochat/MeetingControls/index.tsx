import React, { FC } from 'react'
import { ControlBar, useRemoteVideoTileState, useUserActivityState } from 'amazon-chime-sdk-component-library-react'
import { useTheme } from '@material-ui/core'

import { EndMeetingControl } from '../EndMeetingControl'
import { CustomControlBarButton, StyledControls } from './Styled'
import { CustomAudioInputControl } from './CustomAudioInputControl'
import { CustomVideoInputControl } from './CustomVideoInputControl'
import { CustomContentShareControl } from './CustomContentShareControl'
// import { CustomRaiseHandControl } from './CustomRaiseHandControl'

import { useVideoChatContext } from 'providers'
import { graphQLMutation } from 'graphql/helpers'
import { updateSession } from 'graphql/mutations'
import { ToggleDrawer } from 'types'

import { ChatIcon, SpeakerMuteIcon } from 'assets'
import { CustomAudioOutputControl } from './CustomAudioOutputControl'

interface MeetingControlProps {
  setVisible: (val: boolean) => void
  isPresenter?: boolean
  isVideoPresenter?: boolean
  isClassroom?: boolean
  toggleDrawer?: ToggleDrawer
}

const MeetingControls: FC<MeetingControlProps> = ({
  setVisible,
  isPresenter,
  isVideoPresenter,
  isClassroom,
  toggleDrawer
}) => {
  const { isUserActive } = useUserActivityState()
  const { tiles } = useRemoteVideoTileState()
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
        {isClassroom && (isPresenter || isVideoPresenter) ? (
          <CustomAudioInputControl isAdmin={Boolean(isPresenter || isVideoPresenter)} />
        ) : null}
        {isClassroom && !isPresenter && !isVideoPresenter ? <CustomAudioOutputControl /> : null}
        <CustomControlBarButton
          icon={<ChatIcon width={16} height={16} />}
          onClick={() => toggleDrawer && toggleDrawer(null, 'rightPersistent', true)}
          label='Chat'
        />
        {/* {isClassroom && !isPresenter ? <CustomRaiseHandControl sessionId={videoChatState?.session?.id || ''} /> : null} */}
        {isClassroom && isVideoPresenter && tiles.length < 4 ? <CustomVideoInputControl /> : null}
        {!isClassroom ? <CustomVideoInputControl /> : null}
        <EndMeetingControl setVisible={setVisible} isPresenter={isPresenter} />
        <section className='controls-menu-right'>
          {(isClassroom && isVideoPresenter) || !isClassroom ? <CustomContentShareControl /> : null}
          {/* {isClassroom && isPresenter ? (
            <CustomControlBarButton
              icon={<SpeakerMuteIcon width={16} height={16} fill={videoChatState.globalMute ? 'white' : 'black'} />}
              onClick={toggleMuteAll}
              backgroundColor={videoChatState.globalMute ? theme.palette.error.main : 'white'}
              label='Mute All'
            />
          ) : null} */}
        </section>
      </ControlBar>
    </StyledControls>
  )
}

export default MeetingControls
