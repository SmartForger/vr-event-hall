import React, { FC } from 'react'

export const PinIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 16, height = 18, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props}>
      <path
        d='M15.55 12.8L12.6 9.94l-.81-6.99 1.4-1.78V0H2.36v1.17l1.4 1.78-.81 6.99L0 12.8h7.22V18h1.1v-5.2h7.23zM2.72 11.7l1-.97.28-.27.05-.39.81-6.99.05-.45-.28-.36-.92-1.17H11.84l-.92 1.17-.28.36.05.45.81 6.99.05.39.28.27 1 .97H2.72z'
        fill={fill}
      />
    </svg>
  )
)
