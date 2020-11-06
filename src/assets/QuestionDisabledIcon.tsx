import React, { FC } from 'react'

export const QuestionDisabledIcon: FC<React.SVGProps<SVGSVGElement>> = React.memo(
  ({ width = 24, height = 24, fill = '#000', ...props }) => (
    <svg width={width} height={height} {...props} fill='none' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='11.5' stroke='black' />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M9.06665 7.06665C9.86664 6.26666 10.8 6 11.8666 6C12.8 6 13.7333 6.26666 14.5333 6.79999C15.2 7.33331 15.6 8.13336 15.6 9.20001C15.6 10.1334 15.3333 10.9333 14.6667 11.4667C14.1334 11.8666 14 12 13.6 12.4C13.0667 12.8 12.9333 13.2 12.8 13.6C12.6667 13.8666 12.6667 14.1334 12.6667 14.5333H10.9333C10.9333 13.8666 10.9333 13.2 11.2 12.5333C11.4105 12.0071 11.7871 11.647 12.2643 11.1908C12.3917 11.069 12.5262 10.9404 12.6667 10.8C13.3333 10.2667 13.4667 9.86664 13.4667 9.20001C13.4667 8.13336 12.6667 7.46667 11.8666 7.46667C10.4 7.46667 9.86664 8.53333 9.86664 9.86664H8C8 8.79999 8.40002 7.73334 9.06665 7.06665ZM10.6667 15.7334H12.8V17.7334H10.6667V15.7334Z'
        fill='black'
      />
    </svg>
  )
)