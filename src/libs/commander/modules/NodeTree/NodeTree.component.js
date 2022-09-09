import React from 'react'
import { Nodes } from './components/Nodes/Nodes.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({
  root,
  objetives,
  setObjetives,
  handleRootChange,
  openNodes,
  setOpenNodes,
  setEditingElement
}) => {
  return (
    <TreeWrapper>
      <Nodes
        node={root}
        root={root}
        objetives={objetives}
        setObjetives={setObjetives}
        handleRootChange={handleRootChange}
        openNodes={openNodes}
        setOpenNodes={setOpenNodes}
        setEditingElement={setEditingElement}
      />
    </TreeWrapper>
  )
}
