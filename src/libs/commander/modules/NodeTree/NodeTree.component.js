import React from 'react'
import { Nodes } from './components/Nodes/Nodes.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({
  root,
  objetives,
  setObjetives,
  handleRootChange
}) => {
  return (
    <TreeWrapper>
      <Nodes
        node={root}
        objetives={objetives}
        setObjetives={setObjetives}
        handleRootChange={handleRootChange}
      />
    </TreeWrapper>
  )
}
