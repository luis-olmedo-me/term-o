import React from 'react'
import { objectLabels, arrayLabels } from './Tree.constants'
import { CollapseButton, IdentedWrapper } from './Tree.styles'

const DefaultWrapper = ({ children }) => <div>{children}</div>

export const Tree = ({ content, title, Wrapper = DefaultWrapper, hasComa }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  const isContentObject = typeof content === 'object'
  const isContentArray = Array.isArray(content)
  const isContentOnlyObject = isContentObject && !isContentArray

  if (isContentObject) {
    const labels = isContentOnlyObject ? objectLabels : arrayLabels
    const hasRichContent = Object.keys(content).length > 0

    const labelContent = hasRichContent ? '...' : ''
    const collapsedLabel = `${labels.OPEN} ${labelContent} ${labels.CLOSE}`

    const collapsingLabel = isCollapsed ? collapsedLabel : labels.OPEN
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    return (
      <Wrapper>
        {labelTitle}
        {hasComa && isCollapsed && ','}

        <CollapseButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          disabled={!hasRichContent}
        >
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

        {!isCollapsed && labels.CLOSE}
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
