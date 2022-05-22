import React from 'react'
import { CollapseButton, IdentedWrapper } from './Tree.styles'

const collapsedObjectLabel = '{ ... }'
const collapsedArrayLabel = '[ ... ]'

const DefaultWrapper = ({ children }) => <div>{children}</div>

export const Tree = ({ content, title, Wrapper = DefaultWrapper, hasComa }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  const isContentObject = typeof content === 'object'
  const isContentArray = Array.isArray(content)
  const isContentOnlyObject = isContentObject && !isContentArray

  if (isContentOnlyObject) {
    const collapsingLabel = isCollapsed ? collapsedObjectLabel : '{'
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    return (
      <Wrapper>
        {labelTitle}
        {hasComa && ','}

        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '+' : '-'}
        </CollapseButton>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value], index) => {
              const isLastItem = index === Object.keys(content).length - 1

              return (
                <Tree
                  title={key}
                  content={value}
                  Wrapper={IdentedWrapper}
                  hasComa={!isLastItem}
                />
              )
            })}

        {!isCollapsed && '}'}
      </Wrapper>
    )
  } else if (isContentArray) {
    const collapsingLabel = isCollapsed ? collapsedArrayLabel : '['
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    return (
      <Wrapper>
        {labelTitle}
        {hasComa && isCollapsed && ','}

        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '+' : '-'}
        </CollapseButton>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value], index) => {
              const isLastItem = index === Object.keys(content).length - 1

              return (
                <Tree
                  title={key}
                  content={value}
                  Wrapper={IdentedWrapper}
                  hasComa={!isLastItem}
                />
              )
            })}

        {!isCollapsed && ']'}
        {hasComa && !isCollapsed && ','}
      </Wrapper>
    )
  }

  const isContentString = typeof content === 'string'
  const quotedContent = isContentString ? `"${content}"` : content

  return (
    <Wrapper>
      <span>
        {title ? `${title}: ${quotedContent}` : quotedContent}
        {hasComa && ','}
      </span>
    </Wrapper>
  )
}
