import React, { useState } from 'react'
import { ElementLabel } from '../ElementLabel/ElementLabel.component'
import { TagWrapper } from './Nodes.styles'

const supportedNodeTypes = [Node.ELEMENT_NODE]

export const Nodes = ({ node, level = 0, objetive }) => {
  const childNodes = [...node.childNodes]
  const nodeIncludesObjetive = node === objetive || node.contains(objetive)
  const hasSupportedNodes = childNodes.some((child) => {
    return supportedNodeTypes.includes(child.nodeType)
  })

  const [isOpen, setIsOpen] = useState(nodeIncludesObjetive)

  const handleWrapperClick = (event) => {
    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <div onClick={handleWrapperClick}>
          <ElementLabel
            element={node}
            Wrapper={TagWrapper}
            isHidden={!hasSupportedNodes}
          >
            {childNodes.map((childNode, index) => {
              const isSupportedChildNode = supportedNodeTypes.includes(
                childNode.nodeType
              )

              return (
                isSupportedChildNode &&
                isOpen && (
                  <Nodes
                    key={`${level}-${index}`}
                    level={level + 1}
                    node={childNode}
                    objetive={objetive}
                  />
                )
              )
            })}
          </ElementLabel>
        </div>
      )

    default:
      return null
  }
}
