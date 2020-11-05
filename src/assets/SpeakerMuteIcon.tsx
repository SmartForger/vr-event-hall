import React, { FC } from 'react'

export const SpeakerMuteIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 20, height = 20, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props} viewBox='0 0 20 20'>
      <path
        d='M11.878 3.128v5.16l1.32 1.333V.66L7.853 4.21l.95.963 3.075-2.045zM7.681 5.873l-.937-.95L1.874 0l-.95.924 4.711 4.764-.356.25H0v7.92h5.279l7.918 5.278V13.33l5.662 5.727.937-.924L7.681 5.873zm-2.402 6.665h-3.96v-5.28h3.96v5.28zm6.599 4.13l-5.28-3.47V6.664l5.28 5.331v4.673zM18.16 14.583l.95.964c2.811-3.748 2.455-8.988-.858-12.3l-.924.937a8.073 8.073 0 01.832 10.4zM15.349 11.746l.976.99a5.545 5.545 0 00-.818-6.744l-.99.937a4.162 4.162 0 01.832 4.817z'
        fill={fill}
      />
    </svg>
  )
)
