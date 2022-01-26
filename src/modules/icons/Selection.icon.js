import React from 'react'
import { Icon } from './Icon.styles.js'

export const Selection = ({ cssStyles }) => {
  return (
    <Icon
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      cssStyles={cssStyles}
    >
      <path
        d='M2 5a1 1 0 01-1-1V3c0-1.654 1.346-3 3-3h1a1 1 0 010 2H4c-.551 0-1 .449-1 1v1a1 1 0 01-1 1zM20 5a1 1 0 01-1-1V3c0-.551-.449-1-1-1h-1a1 1 0 010-2h1c1.654 0 3 1.346 3 3v1a1 1 0 01-1 1zM13 2H9a1 1 0 010-2h4a1 1 0 010 2zM11 20H9a1 1 0 010-2h2a1 1 0 010 2zM5 20H4c-1.654 0-3-1.346-3-3v-1a1 1 0 012 0v1c0 .551.449 1 1 1h1a1 1 0 010 2zM2 13a1 1 0 01-1-1V8a1 1 0 012 0v4a1 1 0 01-1 1zM20 11a1 1 0 01-1-1V8a1 1 0 012 0v2a1 1 0 01-1 1zM23.796 18.624l-9.433-9.433a.652.652 0 00-1.113.461v13.695a.652.652 0 001.121.453l3.917-4.062h5.049a.652.652 0 00.459-1.114z'
        fill='currentColor'
      />
    </Icon>
  )
}
