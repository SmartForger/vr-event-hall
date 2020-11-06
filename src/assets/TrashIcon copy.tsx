import React, { FC } from 'react'

export const TrashIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 14, height = 18, fill = 'black', ...props }) => {
    return (
      <svg width={width} height={height} fill={fill} {...props}>
        <path
          d='M1.2 18h11.2V4.5H1.2V18zM2.3 5.6h9v11.2h-9V5.6zM9 2.2V0H4.6v2.2H0v1.1h13.5V2.2H9zm-1.1 0H5.7V1.1h2.2v1.1z'
          fill='#000'
        />
        <path d='M5.3 7.9H4.2v6.8h1.1V7.9zM9.3 7.9H8.2v6.8h1.1V7.9z' fill='#000' />
      </svg>
    )
  }
)
