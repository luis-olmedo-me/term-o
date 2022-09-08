import React, { useEffect, useRef, useState } from 'react'
import { getAttributes } from '../../../../components/CommandDom/CommandDom.helpers'
import { Actions } from '../Actions/Actions.component'
import {
  AttributeName,
  AttributeValue,
  Equal,
  Tag,
  TagName,
  DefaultWrapper,
  ChildWrapper
} from './ElementLabel.styles'

export const ElementLabel = ({
  element,
  isHidden,
  children,
  Wrapper = DefaultWrapper,
  wrapperProps = {},
  actions,
  hideAttributes
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

  const attributes = hideAttributes ? {} : getAttributes(element)

  const hasChildren = children?.some(Boolean)
  const hasActions = actions?.length > 0

  return (
    <>
      <Wrapper paddingRight={actionsPaddingRight} {...wrapperProps}>
        <Tag opening>{'<'}</Tag>

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

        {hasActions && <Actions wrapperRef={actionsRef} actions={actions} />}
      </Wrapper>

      {hasChildren && (
        <>
          <ChildWrapper>
            <span>{children}</span>
          </ChildWrapper>

          <Wrapper {...wrapperProps}>
            <Tag opening>{`</`}</Tag>
            <TagName isHidden={isHidden}>{tagName}</TagName>
            <Tag>{`>`}</Tag>
          </Wrapper>
        </>
      )}
    </>
  )
}
