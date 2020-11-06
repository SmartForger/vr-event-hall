import React, { FC } from 'react'

interface MuteIconProps extends React.SVGProps<SVGSVGElement> {
  muted?: boolean
}

export const MuteIcon: FC<MuteIconProps> = React.memo(
  ({ width = 24, height = 24, fill = '#000', muted = false, ...props }) => (
    <svg width={width} height={height} viewBox='0 0 24 24' {...props}>
      <path
        d='M22.84.053L16.453 6.44V4.507C16.453 2.027 14.427 0 11.96 0 9.493 0 7.453 2.027 7.453 4.507v9c0 .573.12 1.12.32 1.626l-1.12 1.12c-.44-.826-.706-1.746-.706-2.733H4.453c0 1.413.4 2.733 1.08 3.853L0 22.893l1.067 1.067L23.893 1.107 22.84.053zM8.96 13.507v-9c0-1.654 1.347-3 3-3s3 1.346 3 3v3.44L9 13.907a2.036 2.036 0 01-.04-.4zM11.96 19.507a5.976 5.976 0 01-3.374-1.04L7.52 19.533a7.467 7.467 0 003.693 1.427v1.533h-3.76V24h9v-1.507h-3.746V20.96a7.499 7.499 0 006.746-7.467H17.96c0 3.32-2.694 6.014-6 6.014z'
        fill={muted ? 'white' : fill}
      />
      <path
        d='M11.96 16.507c-.414 0-.814-.08-1.174-.24L9.693 17.36c.666.4 1.44.64 2.266.64a4.518 4.518 0 004.507-4.507v-2.906l-1.507 1.506v1.414c0 1.653-1.346 3-3 3z'
        fill={muted ? 'white' : fill}
      />
    </svg>
  )
)
