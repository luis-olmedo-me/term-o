import React from 'react'
import { ElementLabel } from '../../../../components/ParameterElements/components/ElementLabel/ElementLabel.component'
import { TagWrapper } from './NodeLabel.styles'

const supportedNodeTypes = [Node.ELEMENT_NODE]

export const NodeLabel = ({ node, level = 0, objetive }) => {
  const childNodes = [...node.childNodes]
  const nodeIncludesObjetive = node === objetive || node.contains(objetive)
  const hasSupportedNodes = childNodes.some((child) => {
    return supportedNodeTypes.includes(child.nodeType)
  })

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <div>
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
                nodeIncludesObjetive && (
                  <NodeLabel
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
