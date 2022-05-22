import React from 'react'
import { CollapseButton, IdentedWrapper } from './Tree.styles'

const collapsedObjectLabel = '{ ... }'
const collapsedArrayLabel = '[ ... ]'

const DefaultWrapper = ({ children }) => <div>{children}</div>

export const Tree = ({ content, title, Wrapper = DefaultWrapper }) => {
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

        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '+' : '-'}
        </CollapseButton>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value]) => (
              <Tree title={key} content={value} Wrapper={IdentedWrapper} />
            ))}

        {!isCollapsed && '}'}
      </Wrapper>
    )
  } else if (isContentArray) {
    const collapsingLabel = isCollapsed ? collapsedArrayLabel : '['
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    return (
      <Wrapper>
        {labelTitle}

        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '+' : '-'}
        </CollapseButton>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value]) => (
              <Tree title={key} content={value} Wrapper={IdentedWrapper} />
            ))}

        {!isCollapsed && ']'}
      </Wrapper>
    )
  }

  const isContentString = typeof content === 'string'
  const quotedContent = isContentString ? `"${content}"` : content

  return (
    <Wrapper>
      <span>{title ? `${title}: ${quotedContent}` : quotedContent}</span>
    </Wrapper>
  )
}
