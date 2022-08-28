import React from 'react'
import { Favicon, TabWrapper, Title } from './Tab.styles'

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
      <Favicon src={element.favIconUrl} alt='favicon' />

      <Title>{element.title}</Title>
    </TabWrapper>
  )
}
