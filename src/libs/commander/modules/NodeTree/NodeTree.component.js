import React from 'react'
import { Nodes } from './components/Nodes/Nodes.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({ root, objetives }) => {
  return (
    <TreeWrapper>
      <Nodes node={root} objetives={objetives} />
    </TreeWrapper>
  )
}
