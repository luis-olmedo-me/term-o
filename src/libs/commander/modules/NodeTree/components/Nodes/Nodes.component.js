import React, { useState } from 'react'
import { ElementLabel } from '../ElementLabel/ElementLabel.component'
import { TagWrapper, ActionButtonText, GapNodesWrapper } from './Nodes.styles'

const supportedNodeTypes = [Node.ELEMENT_NODE, Node.TEXT_NODE]

export const Nodes = ({ node, level = 0, objetives, setObjetives }) => {
  const childNodes = [...node.childNodes].filter(
    (node) => !supportedNodeTypes.includes(node)
  )

  const nodeIncludesObjetive = objetives.some((objetive) =>
    node.contains(objetive)
  )
  const isNodeObjetive = objetives.some((objetive) => node === objetive)
  const hasNodes = childNodes.length > 0

  const [isOpen, setIsOpen] = useState(nodeIncludesObjetive)

  const actions = [
    {
      id: 'toggle-element',
      onClick: () => setIsOpen(!isOpen),
      disabled: !hasNodes,
      Component: <ActionButtonText isOpen={isOpen}>{'<'}</ActionButtonText>
    }
  ]

  const handleNodeClick = () => setObjetives([node])

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <GapNodesWrapper>
          <ElementLabel
            element={node}
            Wrapper={TagWrapper}
            actions={actions}
            wrapperProps={{ isNodeObjetive, onClick: handleNodeClick }}
          >
            {childNodes.map((childNode, index) => {
              return (
                isOpen && (
                  <Nodes
                    key={`${level}-${index}`}
                    level={level + 1}
                    node={childNode}
                    objetives={objetives}
                    setObjetives={setObjetives}
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
          <TagWrapper onClick={handleNodeClick} isNodeObjetive={isNodeObjetive}>
            "{node.textContent}"
          </TagWrapper>
        </GapNodesWrapper>
      )

    default:
      return null
  }
}
