import * as React from 'preact'

import { getAttributes } from '@src/helpers/dom.helpers'
import { Actions } from '@src/modules/components/Actions'
import {
  AttributeName,
  AttributeValue,
  ChildWrapper,
  DefaultWrapper,
  Equal,
  Tag,
  TagName
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
            attributeValue.length > 50 ? `${attributeValue.slice(0, 47)}...` : attributeValue

          return (
            <span key={attributeName}>
              <AttributeName isHidden={isHidden}>{` ${attributeName}`}</AttributeName>

              {attributeValue && (
                <>
                  <Equal isHidden={isHidden}>{`=`}</Equal>

                  <AttributeValue isHidden={isHidden} title={attributeValue}>
                    {`"${attributeValueShorten}"`}
                  </AttributeValue>
                </>
              )}
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
