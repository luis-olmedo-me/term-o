import * as React from 'react'
import { Nodes } from './components/Nodes/Nodes.component'
import { TreeWrapper } from './NodeTree.styles'

export const NodeTree = ({
  root,
  objetives,
  onElementClick,
  handleRootChange,
  openNodes,
  setOpenNodes,
  setEditingElement,
  onStylesOptionClick
}) => {
  return (
    <TreeWrapper>
      <Nodes
        node={root}
        root={root}
        objetives={objetives}
        onElementClick={onElementClick}
        handleRootChange={handleRootChange}
        openNodes={openNodes}
        setOpenNodes={setOpenNodes}
        setEditingElement={setEditingElement}
        onStylesOptionClick={onStylesOptionClick}
      />
    </TreeWrapper>
  )
}
