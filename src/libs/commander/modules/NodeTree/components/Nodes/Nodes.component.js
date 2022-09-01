import React, { useEffect, useRef, useState } from 'react'
import { ElementLabel } from '../ElementLabel/ElementLabel.component'
import { TagWrapper, ActionButtonText, GapNodesWrapper } from './Nodes.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../../components/CommandDom/CommandDom.helpers'

const supportedNodeTypes = [Node.ELEMENT_NODE, Node.TEXT_NODE]

const NodesWithoutContext = ({
  node,
  level = 0,
  root,
  objetives,
  setObjetives,
  handleRootChange,
  setHighlitedElement
}) => {
  const nodeWrapperRef = useRef(null)

  const childNodes = [...node.childNodes].filter(
    (node) => !supportedNodeTypes.includes(node)
  )

  const nodeIncludesObjetive = objetives.some((objetive) =>
    node.contains(objetive)
  )
  const isNodeObjetive = objetives.some((objetive) => node === objetive)
  const isNodeRoot = root === node
  const hasNodes = childNodes.length > 0

  const [isOpen, setIsOpen] = useState(nodeIncludesObjetive)

  useEffect(() => {
    if (!isNodeObjetive || objetives.length > 1) return

    nodeWrapperRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }, [isNodeObjetive, objetives])

  const actions = [
    {
      id: 'toggle-element',
      onClick: () => setIsOpen(!isOpen),
      disabled: !hasNodes,
      Component: <ActionButtonText isOpen={isOpen}>{'<'}</ActionButtonText>
    },
    {
      id: 'change-root',
      onClick: () => handleRootChange(node),
      disabled: !hasNodes,
      Component: isNodeRoot ? '✽' : '⚬'
    }
  ]

  const handleNodeClick = () => setObjetives([node])

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      const isHidden = isElementHidden(node)

      return (
        <GapNodesWrapper ref={nodeWrapperRef}>
          <ElementLabel
            element={node}
            Wrapper={TagWrapper}
            actions={actions}
            isHidden={isHidden}
            wrapperProps={{
              isNodeObjetive,
              onClick: handleNodeClick,
              onMouseEnter: !isHidden ? () => setHighlitedElement(node) : null,
              onMouseLeave: !isHidden ? () => setHighlitedElement(null) : null
            }}
          >
            {childNodes.map((childNode, index) => {
              return (
                isOpen && (
                  <Nodes
                    key={`${level}-${index}`}
                    level={level + 1}
                    node={childNode}
                    root={root}
                    objetives={objetives}
                    setObjetives={setObjetives}
                    handleRootChange={handleRootChange}
                  />
                )
              )
            })}
          </ElementLabel>
        </GapNodesWrapper>
      )

    case Node.TEXT_NODE:
      return (
        <GapNodesWrapper ref={nodeWrapperRef}>
          <TagWrapper onClick={handleNodeClick} isNodeObjetive={isNodeObjetive}>
            "{node.textContent}"
          </TagWrapper>
        </GapNodesWrapper>
      )

    default:
      return null
  }
}

export const Nodes = withOverlayContext(NodesWithoutContext)
