import React, { FC } from 'react'

interface CameraOffIconProps extends React.SVGProps<SVGSVGElement> {
  disabled?: boolean
}

export const CameraOffIcon: FC<CameraOffIconProps> = React.memo(
  ({ width = 24, height = 24, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props} viewBox='0 0 24 24'>
      <path
        d='M18 11.72l6 7.507V4.213l-6 7.507zm4.507 3.227l-2.574-3.227 2.574-3.227v6.454zM16.506 9.453v8.267H9.88l-1.2 1.493H18V7.573l-1.494 1.88zM20.413 0L17.04 4.213H0v15h5.04l-2.627 3.28 1.174.934 18-22.494L20.413 0zM1.507 17.72v-12H15.84l-9.6 12H1.507z'
        fill={fill}
      />
    </svg>
  )
)
