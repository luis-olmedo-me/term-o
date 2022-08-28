import React from 'react'
import { TabWrapper } from './Tab.styles'

export const Tab = ({
  element = {},
  className = '',
  variant = '',
  shouldAnimate = false
}) => {
  return (
    <TabWrapper
      className={`${className} ${variant}`}
      shouldAnimate={shouldAnimate}
    >
      <img src={element.favIconUrl} alt='' />

      <span>{element.title}</span>
    </TabWrapper>
  )
}
