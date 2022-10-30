import * as React from 'react'
import { CircleWrapper, ClockWrapper, ValueWrapper } from './Clock.styles'

export const Clock = () => {
  return (
    <ClockWrapper>
      <CircleWrapper viewBox='0 0 220 220'>
        <circle shape-rendering='geometricPrecision' cx='110' cy='110' r='96' />
        <circle
          shape-rendering='geometricPrecision'
          class='indicator'
          cx='110'
          cy='110'
          r='96'
        />
      </CircleWrapper>

      <ValueWrapper>
        <span>1</span>:<span>00</span>
      </ValueWrapper>
    </ClockWrapper>
  )
}
