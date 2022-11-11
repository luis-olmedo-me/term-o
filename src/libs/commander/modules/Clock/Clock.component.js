import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {
  ClockWrapper,
  Progress,
  ProgressBar,
  ValueWrapper
} from './Clock.styles'

export const Clock = ({ time, onFinish }) => {
  const [currentTime, setCurrentTime] = useState(time)

  useEffect(() => {
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

    return () => {
      clearTimeout(timeoutId)
      clearInterval(decreaseIntervalId)

      setCurrentTime(0)
    }
  }, [time, onFinish])

  const progress = (currentTime * 100) / time

  return (
    <ClockWrapper>
      <ProgressBar />
      <Progress porcentage={progress} />

      <ValueWrapper>{currentTime}</ValueWrapper>
    </ClockWrapper>
  )
}
