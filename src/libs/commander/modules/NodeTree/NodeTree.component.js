import * as React from 'react'
import { Nodes } from './components/Nodes/Nodes.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({
  root,
  objetives,
  onElementClick,
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
        onElementClick={onElementClick}
        openNodes={openNodes}
        setOpenNodes={setOpenNodes}
        setEditingElement={setEditingElement}
      />
    </TreeWrapper>
  )
}
