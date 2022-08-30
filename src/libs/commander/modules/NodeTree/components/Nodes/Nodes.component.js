import React, { useState } from 'react'
import { ElementLabel } from '../ElementLabel/ElementLabel.component'
import { TagWrapper, ActionButtonText, GapNodesWrapper } from './Nodes.styles'

const supportedNodeTypes = [Node.ELEMENT_NODE, Node.TEXT_NODE]

export const Nodes = ({ node, level = 0, objetives }) => {
  const childNodes = [...node.childNodes]

  const nodeIncludesObjetive = objetives.some((objetive) =>
    node.contains(objetive)
  )
  const isNodeObjetive = objetives.some((objetive) => node === objetive)

  const hasSupportedNodes = childNodes.some((child) => {
    return supportedNodeTypes.includes(child.nodeType)
  })

  const [isOpen, setIsOpen] = useState(nodeIncludesObjetive)

  const actions = [
    {
      id: 'toggle-element',
      onClick: () => setIsOpen(!isOpen),
      disabled: !hasSupportedNodes,
      Component: <ActionButtonText isOpen={isOpen}>{'<'}</ActionButtonText>
    }
  ]

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <GapNodesWrapper>
          <ElementLabel
            element={node}
            Wrapper={TagWrapper}
            actions={actions}
            wrapperProps={{ isNodeObjetive }}
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
                    objetives={objetives}
                  />
                )
              )
            })}
          </ElementLabel>
        </GapNodesWrapper>
      )

    case Node.TEXT_NODE:
      return (
        <GapNodesWrapper>
          <TagWrapper>"{node.textContent}"</TagWrapper>
        </GapNodesWrapper>
      )

    default:
      return null
  }
}
