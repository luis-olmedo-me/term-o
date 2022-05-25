import React from 'react'
import { objectLabels, arrayLabels } from './Tree.constants'
import { CollapseButton, IdentedWrapper } from './Tree.styles'

export const Tree = ({ content, title, className, hasComa }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  const isContentObject = typeof content === 'object' && content !== null
  const isContentArray = Array.isArray(content)
  const isContentOnlyObject = isContentObject && !isContentArray

  if (isContentObject) {
    const labels = isContentOnlyObject ? objectLabels : arrayLabels
    const hasRichContent = Object.keys(content).length > 0

    const labelContent = hasRichContent ? '...' : ''
    const collapsedLabel = `${labels.OPEN} ${labelContent} ${labels.CLOSE}`

    const collapsingLabel = isCollapsed ? collapsedLabel : labels.OPEN
    const labelTitle = title ? `${title}: ${collapsingLabel}` : collapsingLabel

    const handleCollapse = (event) => {
      event.stopPropagation()

      setIsCollapsed(!isCollapsed)
    }

    return (
      <div className={className}>
        {labelTitle}
        {hasComa && isCollapsed && ','}

        <CollapseButton onClick={handleCollapse} disabled={!hasRichContent}>
          {isCollapsed ? '+' : '-'}
        </CollapseButton>

        {isCollapsed
          ? null
          : Object.entries(content).map(([key, value], index) => {
              const isLastItem = index === Object.keys(content).length - 1

              return (
                <Tree
                  key={`${key}-${index}`}
                  title={key}
                  content={value}
                  Wrapper={IdentedWrapper}
                  hasComa={!isLastItem}
                />
              )
            })}

        {!isCollapsed && labels.CLOSE}
        {hasComa && !isCollapsed && ','}
      </div>
    )
  }

  const isContentString = typeof content === 'string'
  const quotedContent = isContentString ? `"${content}"` : content

  return (
    <div className={className}>
      <span>
        {title ? `${title}: ${quotedContent}` : quotedContent}
        {hasComa && ','}
      </span>
    </div>
  )
}
