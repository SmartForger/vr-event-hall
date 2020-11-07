import React, { FC } from 'react'

export const CameraOnIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 24, height = 24, fill = '#000', ...props }) => (
    <svg width={width} height={height} fill={fill} {...props} viewBox='0 0 24 24'>
      <path d='M18 11.7l6 7.5v-15l-6 7.5zm4.5 3.2l-2.6-3.2 2.6-3.2v6.4z' />
      <path fill='none' d='M1.5 17.7h15v-12h-15z' />
      <path d='M0 4.2v15h18v-15H0zm16.5 13.5h-15v-12h15v12z' />
    </svg>
  )
)
