import React, { useEffect, useRef, useState } from 'react'
import {
  AttributeName,
  AttributeValue,
  Equal,
  Tag,
  TagName,
  DefaultWrapper,
  ChildWrapper,
  DirectionSign,
  ActionButtons,
  ActionButton
} from './ElementLabel.styles'

export const ElementLabel = ({
  element,
  isHidden,
  children,
  Wrapper = DefaultWrapper,
  showDirection,
  actions
}) => {
  const actionsRef = useRef(null)
  const [actionsPaddingRight, setActionsPaddingRight] = useState(0)

  useEffect(function checkWrapperPadding() {
    const { offsetWidth } = actionsRef.current
    const paddingRight = offsetWidth + 10

    setActionsPaddingRight(paddingRight)
  }, [])

  const { id, classList, href, type, fill } = element

  const tagName = element.tagName.toLowerCase()
  const classes = [...classList].join(' ')

  const viewBox = element.getAttribute('viewBox')
  const width = element.getAttribute('width')
  const height = element.getAttribute('height')

  const hasChildren = children?.some(Boolean)

  return (
    <>
      <Wrapper paddingRight={actionsPaddingRight}>
        <Tag>{'<'}</Tag>

        <TagName isHidden={isHidden}>{tagName}</TagName>

        {id && (
          <>
            <AttributeName isHidden={isHidden}>{` id`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${id}"`}</AttributeValue>
          </>
        )}

        {classes && (
          <>
            <AttributeName isHidden={isHidden}>{` class`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue
              isHidden={isHidden}
            >{`"${classes}"`}</AttributeValue>
          </>
        )}

        {href && (
          <>
            <AttributeName isHidden={isHidden}>{` href`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${href}"`}</AttributeValue>
          </>
        )}

        {type && (
          <>
            <AttributeName isHidden={isHidden}>{` type`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${type}"`}</AttributeValue>
          </>
        )}

        {fill && (
          <>
            <AttributeName isHidden={isHidden}>{` fill`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${fill}"`}</AttributeValue>
          </>
        )}

        {width && (
          <>
            <AttributeName isHidden={isHidden}>{` width`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${width}"`}</AttributeValue>
          </>
        )}
        {height && (
          <>
            <AttributeName isHidden={isHidden}>{` height`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${height}"`}</AttributeValue>
          </>
        )}

        {viewBox && (
          <>
            <AttributeName isHidden={isHidden}>{` viewBox`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>
              {`"${viewBox}"`}
            </AttributeValue>
          </>
        )}

        {<Tag>{hasChildren ? ' >' : ' />'}</Tag>}

        {showDirection && (
          <DirectionSign disabled={!hasChildren}>
            <span
              style={{
                display: 'inline-block',
                transform: `rotate(${hasChildren ? '-90deg' : '90deg'})`
              }}
            >
              {'<'}
            </span>
          </DirectionSign>
        )}

        <ActionButtons ref={actionsRef}>
          {actions?.map((action) => {
            return (
              <ActionButton key={action.id} onClick={action.onClick}>
                {action.Component}
              </ActionButton>
            )
          })}
        </ActionButtons>
      </Wrapper>

      {hasChildren && (
        <>
          <ChildWrapper>
            <span>{children}</span>
          </ChildWrapper>

          <Wrapper>
            <Tag>{`</`}</Tag>
            <TagName isHidden={isHidden}>{tagName}</TagName>
            <Tag>{`>`}</Tag>
          </Wrapper>
        </>
      )}
    </>
  )
}
