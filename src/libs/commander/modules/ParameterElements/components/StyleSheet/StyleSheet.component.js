import React from 'react'
import { StyleSheetWrapper, Title } from './StyleSheet.styles'

export const StyleSheet = ({ element = {}, className = '' }) => {
  return (
    <StyleSheetWrapper className={className}>
      <Title>{element.title}</Title>
    </StyleSheetWrapper>
  )
}
