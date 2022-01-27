import React from 'react'
import { ElementWrapper } from './Element.styles'

export const Element = ({ htmlElement }) => {
  return <ElementWrapper>{htmlElement.tagName.toLowerCase()}</ElementWrapper>
}
