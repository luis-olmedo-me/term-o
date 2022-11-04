import * as React from 'react'
import { CircleWrapper, ClockWrapper, ValueWrapper } from './Clock.styles'

export const Clock = ({ time, onFinish }) => {
  const [currentTime, setCurrentTime] = React.useState(time)
  console.log('currentTime', currentTime)

  React.useEffect(() => {
    if (!time) return

    const finish = () => {
      clearTimeout(timeoutId)
      clearInterval(decreaseIntervalId)

      setCurrentTime(0)
      onFinish()
    }

    const timeoutId = setTimeout(finish, time * 1000)
    const decreaseIntervalId = setInterval(() => {
      setCurrentTime((oldTime) => --oldTime)
    }, 1000)

    return finish
  }, [time, onFinish])

  return (
    <ClockWrapper>
      <div></div>

      <ValueWrapper>{currentTime}</ValueWrapper>
    </ClockWrapper>
  )
}
