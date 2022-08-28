import React from 'react'
import { ElementLabel } from '../ParameterElements/components/ElementLabel/ElementLabel.component'
import { TagWrapper } from './NodeLabel.styles'

const supportedNodeTypes = [Node.ELEMENT_NODE]

export const NodeLabel = ({ node, level = 0 }) => {
  const childNodes = [...node.childNodes]

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <div>
          <ElementLabel element={node} Wrapper={TagWrapper}>
            {childNodes.map((childNode, index) => {
              const isSupportedChildNode = supportedNodeTypes.includes(
                childNode.nodeType
              )

              return (
                isSupportedChildNode && (
                  <NodeLabel
                    key={`${level}-${index}`}
                    level={level + 1}
                    node={childNode}
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
