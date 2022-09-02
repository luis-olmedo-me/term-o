import React, { useEffect, useRef } from 'react'
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
  openNodes,
  setOpenNodes,
  handleRootChange,
  setHighlitedElement
}) => {
  const nodeWrapperRef = useRef(null)

  const childNodes = [...node.childNodes].filter(
    (node) => !supportedNodeTypes.includes(node)
  )

  const isNodeObjetive = objetives.some((objetive) => node === objetive)
  const isNodeOpen = openNodes.some((openNode) => node === openNode)
  const isNodeRoot = root === node

  const hasNodes = childNodes.length > 0

  useEffect(() => {
    if (!isNodeObjetive || objetives.length > 1) return

    nodeWrapperRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }, [isNodeObjetive, objetives])

  const handleToggleElement = (event) => {
    event.stopPropagation()

    setOpenNodes((openNodes) =>
      isNodeOpen
        ? openNodes.filter((openNode) => openNode !== node)
        : [...openNodes, node]
    )
  }
  const handleChangeRoot = (event) => {
    event.stopPropagation()

    handleRootChange(node)
  }

  const actions = [
    {
      id: 'group',
      items: [
        {
          id: 'change-root',
          title: 'Change root',
          onClick: handleChangeRoot,
          disabled: !hasNodes,
          Component: isNodeRoot ? '✽' : '⚬'
        }
      ]
    },
    {
      id: 'toggle-element',
      onClick: handleToggleElement,
      disabled: !hasNodes,
      title: 'Toggle children',
      Component: <ActionButtonText isOpen={isNodeOpen}>{'<'}</ActionButtonText>
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
                isNodeOpen && (
                  <Nodes
                    key={`${level}-${index}`}
                    level={level + 1}
                    node={childNode}
                    root={root}
                    objetives={objetives}
                    setObjetives={setObjetives}
                    handleRootChange={handleRootChange}
                    openNodes={openNodes}
                    setOpenNodes={setOpenNodes}
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
