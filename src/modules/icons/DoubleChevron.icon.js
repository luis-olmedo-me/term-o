import * as React from 'preact'
import { DirectionableIcon } from './Icon.styles'

export const DoubleChevron = ({ direction = 'right' }) => {
  return (
    <DirectionableIcon
      className={direction}
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='m251.801 269.042-102.374 102.4c-6.998 6.997-18.341 6.997-25.336 0-6.999-6.997-6.999-18.346 0-25.343l89.709-89.731-89.709-89.732c-6.999-6.997-6.999-18.346 0-25.342 6.995-6.998 18.338-6.998 25.336 0l102.374 102.4c6.996 6.997 6.996 18.345 0 25.342v.006Z'
        fill='currentColor'
      />
      <path
        d='m389.704 268.996-102.375 102.4c-6.998 6.997-18.341 6.997-25.336 0-6.998-6.997-6.998-18.345 0-25.342l89.709-89.732-89.709-89.732c-6.998-6.997-6.998-18.345 0-25.342 6.996-6.997 18.338-6.997 25.336 0l102.375 102.4c6.995 6.997 6.995 18.346 0 25.342v.006Z'
        fill='currentColor'
      />
    </DirectionableIcon>
  )
}
