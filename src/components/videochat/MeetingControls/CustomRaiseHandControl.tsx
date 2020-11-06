import React, { FC, useState } from 'react'

import { CustomControlBarButton } from './Styled'
import { RaiseHandIcon } from 'assets'
import { graphQLMutation } from 'graphql/helpers'
// import { createRaisedHand } from 'graphql/mutations'
import { useAppState } from 'providers'

interface CustomRaiseHandControlProps {
  sessionId: string
}

export const CustomRaiseHandControl: FC<CustomRaiseHandControlProps> = ({ sessionId }) => {
  const {
    appState: { user }
  } = useAppState()
  const [handRaised, setHandRaised] = useState<boolean>(false)

  const raiseHand = async () => {
    if (!handRaised) {
      // await graphQLMutation(createRaisedHand, { userId: user?.id, dismissed: false, sessionId })
      setHandRaised(true)
    }
  }

  return (
    <CustomControlBarButton icon={<RaiseHandIcon width={16} height={20} />} onClick={raiseHand} label='Raise Hand' />
  )
}
