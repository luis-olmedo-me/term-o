import React from 'react'
import { ElementLabel } from '../ParameterElements/components/ElementLabel/ElementLabel.component'
import { TagWrapper } from './NodeTree.styles'

export const NodeTree = ({ root }) => {
  return (
    <TagWrapper>
      <ElementLabel element={root} />
    </TagWrapper>
  )
}
