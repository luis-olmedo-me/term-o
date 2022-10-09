import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ElementLabel } from '../ElementLabel/ElementLabel.component'
import {
  TagWrapper,
  ActionButtonText,
  GapNodesWrapper,
  Prefix,
  Postfix
} from './Nodes.styles'
import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import { isElementHidden } from '../../../../components/CommandDom/CommandDom.helpers'
import { createXPathFromElement } from '../../../List/components/Element/Element.helpers'

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
  setHighlitedElement,
  setEditingElement,
  onStylesOptionClick
}) => {
  const nodeWrapperRef = useRef(null)
  const nodeData = useRef({
    parent: node?.parentElement,
    nextSibling: node?.nextElementSibling
  })

  const [isDead, setIsDead] = useState(false)

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

  const handleToggleElement = () => {
    setOpenNodes((openNodes) =>
      isNodeOpen
        ? openNodes.filter((openNode) => openNode !== node)
        : [...openNodes, node]
    )
  }
  const handleChangeRoot = () => {
    handleRootChange(node)
  }

  const handleCopy = () => {
    const xPath = createXPathFromElement(node)

    navigator.clipboard.writeText(xPath.includes(' ') ? `"${xPath}"` : xPath)
  }

  const handleLifeToggle = () => {
    if (isDead) {
      const { parent, nextSibling } = nodeData.current

      setIsDead(false)

      parent.insertBefore(node, nextSibling)
    } else {
      setHighlitedElement(null)
      setIsDead(true)
      node.remove()
    }
  }

  const actions = [
    {
      id: 'group',
      items: [
        {
          id: 'copy-node',
          title: 'Copy xpath',
          onClick: handleCopy,
          Component: '📋'
        },
        {
          id: 'change-root',
          title: 'Change root',
          onClick: handleChangeRoot,
          disabled: !hasNodes,
          Component: '🌱'
        },
        {
          id: 'edit-element',
          title: 'Edit element',
          onClick: () => setEditingElement({ element: node }),
          Component: '✏️'
        },
        {
          id: 'edit-styles',
          title: 'Edit styles',
          onClick: (event) => onStylesOptionClick?.({ event, element: node }),
          Component: '✂️'
        },
        {
          id: 'life-toggle-element',
          title: isDead ? 'Restore element' : 'Delete element',
          onClick: handleLifeToggle,
          Component: isDead ? '↩️' : '💀'
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
    case Node.ELEMENT_NODE: {
      const isHidden = isElementHidden(node)

      return (
        <GapNodesWrapper ref={nodeWrapperRef} isRoot={isNodeRoot}>
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
            Prefix={Prefix}
            Postfix={Postfix}
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
                    setEditingElement={setEditingElement}
                    onStylesOptionClick={onStylesOptionClick}
                  />
                )
              )
            })}
          </ElementLabel>
        </GapNodesWrapper>
      )
    }

    case Node.TEXT_NODE: {
      const isHidden = isElementHidden(node.parentElement)

      return (
        node.textContent.trim() && (
          <GapNodesWrapper ref={nodeWrapperRef}>
            <TagWrapper
              onClick={handleNodeClick}
              isNodeObjetive={isNodeObjetive}
              textNode
              isHidden={isHidden}
            >
              "{node.textContent}"
            </TagWrapper>
          </GapNodesWrapper>
        )
      )
    }

    default:
      return null
  }
}

export const Nodes = withOverlayContext(NodesWithoutContext)
