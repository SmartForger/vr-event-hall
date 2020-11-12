import React, { FC } from 'react'

export const HeadphoneIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 18, height = 18, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props} viewBox='0 0 24 24'>
      <path
        d='M24,13.7c0-6.7-5.3-12-12-12S0,7,0,13.7c0,1.2,0.1,2.3,0.5,3.3l0,0l0,0c0.5,2,1.6,3.7,2.9,5.1l0,0l0,0l4.1-2.4l-2.9-5.1
        l-2.8,1.6c-0.1-0.8-0.3-1.6-0.3-2.5c0-5.7,4.7-10.5,10.5-10.5s10.4,4.8,10.4,10.5c0,0.8-0.1,1.7-0.3,2.5l-2.8-1.6l-3.1,5.2l4.1,2.4
        l0,0l0,0c1.5-1.5,2.4-3.2,3.1-5.2l0,0l0,0C23.8,15.9,24,14.9,24,13.7z M4.1,16.6l1.5,2.5l-1.7,1.1l-1.5-2.5L4.1,16.6z M20.2,20.4
        l-1.9-1.1l1.5-2.5l1.9,1.1L20.2,20.4z'
        fill={fill}
      />
    </svg>
  )
)
