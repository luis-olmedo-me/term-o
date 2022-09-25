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
  hideAttributes,
  Prefix = null,
  Postfix = null
}) => {
  const tagName = element.tagName.toLowerCase()

  const attributes = hideAttributes ? {} : getAttributes(element)

  const hasChildren = children?.some(Boolean)
  const hasActions = actions?.length > 0

  return (
    <>
      <Wrapper {...wrapperProps}>
        {Prefix && <Prefix />}

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

        {<Tag hasPostFix={!!Postfix}>{hasChildren ? ' >' : ' />'}</Tag>}

        {hasActions && <Actions actions={actions} Postfix={Postfix} />}
      </Wrapper>

      {hasChildren && (
        <>
          <ChildWrapper>
            <span>{children}</span>
          </ChildWrapper>

          <Wrapper {...wrapperProps}>
            <Prefix />

            <Tag>{`</`}</Tag>
            <TagName isHidden={isHidden}>{tagName}</TagName>
            <Tag>{`>`}</Tag>

            <Postfix />
          </Wrapper>
        </>
      )}
    </>
  )
}
