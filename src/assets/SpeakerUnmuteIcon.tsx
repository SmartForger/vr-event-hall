import React, { FC } from 'react'

export const SpeakerUnmuteIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 20, height = 20, fill, ...props }) => (
    <svg width={width} height={height} fill={fill} {...props} viewBox='0 0 20 20'>
      <path d='M5.2 5.9H0v7.9h5.3l7.9 5.3V.7l-8 5.2zm.1 6.6h-4V7.3h4v5.2zm6.6 4.2l-5.3-3.5V6.6l5.3-3.5v13.6zM18.2 14.6l1 1c2.8-3.7 2.5-9-.9-12.3l-.9.9c2.7 2.8 3.1 7.2.8 10.4zM15.3 11.7l1 1c1.3-2.2 1-4.9-.8-6.7l-1 .9c1.3 1.3 1.6 3.2.8 4.8z' />
    </svg>
  )
)
