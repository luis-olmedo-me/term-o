import { withOverlayContext } from 'modules/components/Overlay/Overlay.hoc'
import * as React from 'react'
import { Chevron } from 'src/modules/icons/Chevron.icon'
import { isElementHidden } from '../../../../components/CommandDom/CommandDom.helpers'
import { ElementLabel } from '../ElementLabel/ElementLabel.component'
import { GapNodesWrapper, Postfix, Prefix, TagWrapper } from './Nodes.styles'

const supportedNodeTypes = [Node.ELEMENT_NODE, Node.TEXT_NODE]

const NodesWithoutContext = ({
  node,
  level = 0,
  root,
  objetives,
  onElementClick,
  openNodes,
  setOpenNodes,
  setHighlitedElement,
  setEditingElement
}) => {
  const childNodes = [...node.childNodes].filter(
    (node) => !supportedNodeTypes.includes(node)
  )

  const isNodeObjetive = objetives.some((objetive) => node === objetive)
  const isNodeOpen = openNodes.some((openNode) => node === openNode)
  const isNodeRoot = root === node

  const hasNodes = childNodes.length > 0

  const handleToggleElement = () => {
    setOpenNodes((openNodes) =>
      isNodeOpen
        ? openNodes.filter((openNode) => openNode !== node)
        : [...openNodes, node]
    )
  }

  const actions = [
    {
      id: 'toggle-element',
      onClick: handleToggleElement,
      disabled: !hasNodes,
      title: 'Toggle children',
      Component: <Chevron direction={isNodeOpen ? 'top' : 'bottom'} />
    }
  ]

  const handleElementClick = (event) => onElementClick({ element: node, event })

  switch (node.nodeType) {
    case Node.ELEMENT_NODE: {
      const isHidden = isElementHidden(node)

      return (
        <GapNodesWrapper isRoot={isNodeRoot}>
          <ElementLabel
            element={node}
            Wrapper={TagWrapper}
            actions={actions}
            isHidden={isHidden}
            wrapperProps={{
              isNodeObjetive,
              onClick: handleElementClick,
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
                    onElementClick={onElementClick}
                    openNodes={openNodes}
                    setOpenNodes={setOpenNodes}
                    setEditingElement={setEditingElement}
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
          <GapNodesWrapper>
            <TagWrapper
              onClick={handleElementClick}
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
