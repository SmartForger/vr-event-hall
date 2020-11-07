import React, { FC } from 'react'

export const RaiseHandIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 19, height = 24, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props} viewBox='0 0 19 24'>
      <path
        d='M13.576 1.595l-.019 9.48 1.91.003.019-9.48-1.91-.003zM11.561 0h-1.91v11.08h1.91V0zM7.65 1.6H5.74v9.48h1.91V1.6z'
        fill={fill}
      />
      <path
        d='M12 24a6.887 6.887 0 01-6.21-3.96L0 8.53l1.7-.86 5.78 11.5a4.939 4.939 0 009.45-2.02V3.2h1.91v13.96A6.872 6.872 0 0112 24z'
        fill={fill}
      />
    </svg>
  )
)
