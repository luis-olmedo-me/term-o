import * as React from 'preact'
import { Icon } from './Icon.styles'

export const Calendar = () => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg">
      <rect width={288} height={60} x={112} y={110} fill="currentColor" rx={15} />

      <path
        fill="currentColor"
        d="M112 195c0-8.284 6.716-15 15-15h258c8.284 0 15 6.716 15 15v176c0 16.569-13.431 30-30 30H142c-16.569 0-30-13.431-30-30V195Z"
      />
    </Icon>
  )
}
