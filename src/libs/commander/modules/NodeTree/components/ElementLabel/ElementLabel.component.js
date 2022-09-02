import React, { useEffect, useRef, useState } from 'react'
import { getAttributes } from '../../../../components/CommandDom/CommandDom.helpers'
import {
  AttributeName,
  AttributeValue,
  Equal,
  Tag,
  TagName,
  DefaultWrapper,
  ChildWrapper,
  ActionButtons,
  ActionButton
} from './ElementLabel.styles'

export const ElementLabel = ({
  element,
  isHidden,
  children,
  Wrapper = DefaultWrapper,
  wrapperProps = {},
  actions
}) => {
  const actionsRef = useRef(null)
  const [actionsPaddingRight, setActionsPaddingRight] = useState(0)

  useEffect(function checkWrapperPadding() {
    const currentActionRef = actionsRef.current

    if (!currentActionRef) return

    const updatePadding = () => {
      const { offsetWidth } = currentActionRef
      const paddingRight = offsetWidth + 10

      setActionsPaddingRight(paddingRight)
    }

    const obsever = new ResizeObserver(updatePadding)
    obsever.observe(currentActionRef)

    return () => obsever.unobserve(currentActionRef)
  }, [])

  const tagName = element.tagName.toLowerCase()

  const attributes = getAttributes(element)

  const hasChildren = children?.some(Boolean)
  const hasActions = actions?.length > 0

  return (
    <>
      <Wrapper paddingRight={actionsPaddingRight} {...wrapperProps}>
        <Tag>{'<'}</Tag>

        <TagName isHidden={isHidden}>{tagName}</TagName>

        {Object.entries(attributes).map(([attributeName, attributeValue]) => {
          const attributeValueShorten =
            attributeValue.length > 50
              ? `${attributeValue.slice(0, 47)}...`
              : attributeValue

          return (
            <span key={attributeName}>
              <AttributeName isHidden={isHidden}>
                {` ${attributeName}`}
              </AttributeName>

              <Equal isHidden={isHidden}>{`=`}</Equal>

              <AttributeValue isHidden={isHidden} title={attributeValue}>
                {`"${attributeValueShorten}"`}
              </AttributeValue>
            </span>
          )
        })}

        {<Tag>{hasChildren ? ' >' : ' />'}</Tag>}

        {hasActions && (
          <ActionButtons ref={actionsRef}>
            {actions.map((action) => {
              const [isOpen, setIsOpen] = useState(false)

              const items = action.items
                ? [
                    {
                      id: 'toggle-items',
                      onClick: (event) => {
                        event.stopPropagation()
                        setIsOpen(!isOpen)
                      },
                      title: 'Toggle menu',
                      Component: isOpen ? '⚙>' : '⚙'
                    },
                    ...action.items.map((item) => ({
                      ...item,
                      hidden: !isOpen
                    }))
                  ]
                : []

              return action.items ? (
                items.map((item) => {
                  return (
                    <ActionButton
                      key={item.id}
                      onClick={item.disabled ? null : item.onClick}
                      disabled={item.disabled}
                      title={item.title}
                      style={{ display: item.hidden ? 'none' : 'inline-block' }}
                    >
                      {item.Component}
                    </ActionButton>
                  )
                })
              ) : (
                <ActionButton
                  key={action.id}
                  onClick={action.disabled ? null : action.onClick}
                  title={action.title}
                  disabled={action.disabled}
                >
                  {action.Component}
                </ActionButton>
              )
            })}
          </ActionButtons>
        )}
      </Wrapper>

      {hasChildren && (
        <>
          <ChildWrapper>
            <span>{children}</span>
          </ChildWrapper>

          <Wrapper {...wrapperProps}>
            <Tag>{`</`}</Tag>
            <TagName isHidden={isHidden}>{tagName}</TagName>
            <Tag>{`>`}</Tag>
          </Wrapper>
        </>
      )}
    </>
  )
}
