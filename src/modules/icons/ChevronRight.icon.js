import * as React from 'react'
import { DirectionableIcon } from './Icon.styles'

export const ChevronRight = ({ direction }) => {
  return (
    <DirectionableIcon
      className={direction}
      height={24}
      width={24}
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='m319.975 269.042-102.374 102.4c-6.999 6.997-18.341 6.997-25.336 0-6.999-6.997-6.999-18.346 0-25.343l89.709-89.731-89.709-89.732c-6.999-6.997-6.999-18.346 0-25.342 6.995-6.998 18.338-6.998 25.336 0l102.374 102.4c6.995 6.997 6.995 18.345 0 25.342v.006Z'
        fill='currentColor'
      />
    </DirectionableIcon>
  )
}
