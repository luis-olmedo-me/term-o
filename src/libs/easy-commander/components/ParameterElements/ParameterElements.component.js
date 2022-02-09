import React from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from '../Element/Element.component'

export const ParameterElements = ({ elements }) => {
  return (
    <ElementsWrapper>
      {elements.map((element, indexId) => {
        return <Element key={indexId} htmlElement={element} />
      })}
    </ElementsWrapper>
  )
}
