import React, { FC } from 'react'

export const PresentIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 18, height = 18, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props} viewBox='0 0 18 18'>
      <path d='M0 18h18V0H.01L0 18zM1.11 1.1H16.9v15.83H1.11V1.1z' fill={fill} />
      <path d='M10.6 11.6L4.5 5.5V10H3.4V3.6h6.4v1.1H5.3l6.1 6.1-.8.8z' fill={fill} />
    </svg>
  )
)
