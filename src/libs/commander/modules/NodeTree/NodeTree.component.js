import React from 'react'
import { NodeLabel } from './components/NodeLabel/NodeLabel.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({ root, objetive }) => {
  return (
    <TreeWrapper>
      <NodeLabel node={root} objetive={objetive} />
    </TreeWrapper>
  )
}
