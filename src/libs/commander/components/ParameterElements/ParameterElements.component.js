import React from 'react'
import { ElementsWrapper } from './ParameterElements.styles'
import { Element } from './components/Element/Element.component'
import { Overlay } from '../../../../modules/components/Overlay/Overlay.component'

export const ParameterElements = ({ elements }) => {
  const [highlitedElement, setHighlitedElement] = React.useState(null)

  return (
    <ElementsWrapper>
      {elements.map((element, indexId) => {
        return (
          <Element
            key={indexId}
            htmlElement={element}
            setHighlitedElement={setHighlitedElement}
          />
        )
      })}

      <Overlay highlitedElement={highlitedElement} />
    </ElementsWrapper>
  )
}
