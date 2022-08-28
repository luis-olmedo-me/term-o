import React from 'react'
import {
  AttributeName,
  AttributeValue,
  Equal,
  Tag,
  TagName,
  DefaultWrapper
} from './ElementLabel.styles'

export const ElementLabel = ({
  element,
  isHidden,
  children,
  Wrapper = DefaultWrapper
}) => {
  const { id, classList, href, type, fill } = element

  const tagName = element.tagName.toLowerCase()
  const classes = [...classList].join(' ')

  const viewBox = element.getAttribute('viewBox')
  const width = element.getAttribute('width')
  const height = element.getAttribute('height')

  const hasChildren = children?.some(Boolean)

  return (
    <>
      <Wrapper>
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
      </Wrapper>

      {hasChildren && (
        <>
          <div style={{ paddingLeft: '2ch' }}>
            <span>{children}</span>
          </div>

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
