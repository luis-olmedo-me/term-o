import React from 'react'
import styled from 'styled-components'
import { EditableText } from './components/EditableText/EditableText.component'
import { objectLabels, arrayLabels } from './Tree.constants'
import { CollapseButton } from './Tree.styles'

export const Tree = ({
  content,
  title,
  className,
  hasComa,
  isKeyEditionEnabled,
  isValueEditionEnabled,
  handleChange
}) => {
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

    const handleChangeForArrays = (newValue, index) => {
      const formatedContent = content.map((contentValue, contentIndex) => {
        const isSelectedIndex = contentIndex === index

        return isSelectedIndex ? newValue : contentValue
      })

      console.log({ formatedContent, content, newValue, index })

      handleChange(formatedContent)
    }

    const handleChangeForObjects = (newValue, index, key) => {
      const formatedContent = Object.entries(content).reduce(
        (finalContent, _, contentIndex) => {
          const isSelectedIndex = contentIndex === index

          return isSelectedIndex
            ? { ...finalContent, [key]: newValue }
            : finalContent
        },
        { ...content }
      )

      console.log({ formatedContent, content, newValue, index, key })

      handleChange(formatedContent)
    }

    const handleChangeByType = isContentOnlyObject
      ? handleChangeForObjects
      : handleChangeForArrays

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
                <IdentedTree
                  key={`${key}-${index}`}
                  title={key}
                  content={value}
                  hasComa={!isLastItem}
                  isKeyEditionEnabled={isContentOnlyObject}
                  isValueEditionEnabled={isValueEditionEnabled}
                  handleChange={(newValue) =>
                    handleChangeByType(newValue, index, key)
                  }
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
        {title ? (
          <>
            <EditableText
              title={title}
              isEditionEnabled={isKeyEditionEnabled}
              onChange={handleChange}
            />
            {':'}
            <EditableText
              title={quotedContent}
              isEditionEnabled={isValueEditionEnabled}
              onChange={handleChange}
            />
          </>
        ) : (
          <EditableText
            title={quotedContent}
            isEditionEnabled={isValueEditionEnabled}
            onChange={handleChange}
          />
        )}
        {hasComa && ','}
      </span>
    </div>
  )
}

const IdentedTree = styled(Tree)`
  margin-left: 20px;
`
