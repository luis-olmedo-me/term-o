import React from 'react'
import { NodeLabel } from '../NodeLabel/NodeLabel.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({ root }) => {
  return (
    <TreeWrapper>
      <NodeLabel node={root} />
    </TreeWrapper>
  )
}
