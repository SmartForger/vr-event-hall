import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import { DefaultModality } from 'amazon-chime-sdk-js'
import { useAudioVideo, useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { RosterAttendeeType, RosterType } from 'amazon-chime-sdk-component-library-react/lib/types'
import { AttendeeResponse } from 'amazon-chime-sdk-component-library-react/lib/providers/MeetingProvider/types'

interface RosterContextValue {
  roster: RosterType
}

interface CustomAttendee extends RosterAttendeeType {
  email?: string
  avatar?: string
  title?: string
  company?: string
}

interface CustomAttendeeReponse extends AttendeeResponse {
  email?: string
  avatar?: string
  title?: string
  company?: string
}

const RosterContext = React.createContext<RosterContextValue | null>(null)

const RosterProvider: React.FC = ({ children }) => {
  const meetingManager = useMeetingManager()
  const audioVideo = useAudioVideo()
  const rosterRef = useRef<RosterType>({})
  const [roster, setRoster] = useState<RosterType>({})
  // @ts-ignore
  // meetingManager.getAttendee;

  useEffect(() => {
    if (!audioVideo) {
      return
    }

    const rosterUpdateCallback = async (
      chimeAttendeeId: string,
      present: boolean,
      externalUserId?: string
    ): Promise<void> => {
      if (!present) {
        delete rosterRef.current[chimeAttendeeId]

        setRoster((currentRoster: RosterType) => {
          const { [chimeAttendeeId]: _, ...rest } = currentRoster
          return { ...rest }
        })

        return
      }

      const attendeeId = new DefaultModality(chimeAttendeeId).base()
      if (attendeeId !== chimeAttendeeId) {
        return
      }

      const inRoster = rosterRef.current[chimeAttendeeId]
      if (inRoster) {
        return
      }

      let attendee: CustomAttendee = { chimeAttendeeId }

      if (externalUserId) {
        attendee.externalUserId = externalUserId
      }

      if (meetingManager.getAttendee) {
        const externalData: AttendeeResponse | CustomAttendeeReponse = await meetingManager.getAttendee(
          attendeeId,
          externalUserId
        )

        if (externalData.name) {
          attendee.name = externalData.name
        }
        if ((externalData as CustomAttendeeReponse)?.email) {
          attendee.email = (externalData as CustomAttendeeReponse).email
        }
        if ((externalData as CustomAttendeeReponse)?.avatar) {
          attendee.avatar = (externalData as CustomAttendeeReponse).avatar
        }
        if ((externalData as CustomAttendeeReponse)?.title) {
          attendee.title = (externalData as CustomAttendeeReponse).title
        }
        if ((externalData as CustomAttendeeReponse)?.company) {
          attendee.company = (externalData as CustomAttendeeReponse).company
        }
      }

      rosterRef.current[attendeeId] = attendee

      setRoster(oldRoster => ({
        ...oldRoster,
        [attendeeId]: attendee
      }))
    }

    audioVideo.realtimeSubscribeToAttendeeIdPresence(rosterUpdateCallback)

    return () => {
      setRoster({})
      rosterRef.current = {}
      audioVideo.realtimeUnsubscribeToAttendeeIdPresence(rosterUpdateCallback)
    }
  }, [audioVideo])

  const value = useMemo(
    () => ({
      roster
    }),
    [roster]
  )

  return <RosterContext.Provider value={value}>{children}</RosterContext.Provider>
}

function useRosterState(): RosterContextValue {
  const state = useContext(RosterContext)

  if (!state) {
    throw new Error('userRosterState must be used within RosterProvider')
  }

  return state
}

export { RosterProvider, useRosterState }
