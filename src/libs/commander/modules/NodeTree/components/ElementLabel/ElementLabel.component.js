import React, { useEffect, useRef, useState } from 'react'
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
  actions
}) => {
  const actionsRef = useRef(null)
  const [actionsPaddingRight, setActionsPaddingRight] = useState(0)

  useEffect(function checkWrapperPadding() {
    if (!actionsRef.current) return
    const { offsetWidth } = actionsRef.current
    const paddingRight = offsetWidth + 10

    setActionsPaddingRight(paddingRight)
  }, [])

  const { id, classList, type, fill } = element

  const tagName = element.tagName.toLowerCase()
  const classes = [...classList].join(' ')

  const largeHref = element.getAttribute('href')
  const href =
    largeHref?.length > 50 ? `${largeHref.slice(0, 47)}...` : largeHref

  const viewBox = element.getAttribute('viewBox')
  const width = element.getAttribute('width')
  const height = element.getAttribute('height')

  const largeSrc = element.getAttribute('src')
  const src = largeSrc?.length > 50 ? `${largeSrc.slice(0, 47)}...` : largeSrc

  const hasChildren = children?.some(Boolean)
  const hasActions = actions?.length > 0

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

        {src && (
          <>
            <AttributeName isHidden={isHidden}>{` src`}</AttributeName>
            <Equal isHidden={isHidden}>{`=`}</Equal>
            <AttributeValue isHidden={isHidden}>{`"${src}"`}</AttributeValue>
          </>
        )}

        {<Tag>{hasChildren ? ' >' : ' />'}</Tag>}

        {hasActions && (
          <ActionButtons ref={actionsRef}>
            {actions.map((action) => {
              return (
                <ActionButton
                  key={action.id}
                  onClick={action.disabled ? null : action.onClick}
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
