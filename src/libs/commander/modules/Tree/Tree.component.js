import { theme as t } from '@src/helpers/theme.helpers'
import * as React from 'preact'
import { useState } from 'preact/hooks'
import styled from 'styled-components'
import { EditableText } from './components/EditableText/EditableText.component'
import { arrayLabels, objectLabels } from './Tree.constants'
import { CollapseButton, TwoDots } from './Tree.styles'

export const Tree = ({
  content,
  title,
  className,
  hasComa,
  isKeyEditionEnabled,
  isValueEditionEnabled,
  handleChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isContentObject = typeof content === 'object' && content !== null
  const isContentString = typeof content === 'string'
  const isContentArray = Array.isArray(content)
  const isContentOnlyObject = isContentObject && !isContentArray

  if (isContentObject) {
    const labels = isContentOnlyObject ? objectLabels : arrayLabels
    const hasRichContent = Object.keys(content).length > 0

    const labelContent = hasRichContent ? '...' : ''
    const collapsedLabel = `${labels.OPEN} ${labelContent} ${labels.CLOSE}`

    const collapsingLabel = isCollapsed ? collapsedLabel : labels.OPEN

    const handleCollapse = event => {
      event.stopPropagation()

      setIsCollapsed(!isCollapsed)
    }

    const handleChangeForArrays = (newValue, index) => {
      const formatedContent = content.map((contentValue, contentIndex) => {
        const isSelectedIndex = contentIndex === index

        return isSelectedIndex ? newValue : contentValue
      })

      handleChange(formatedContent)
    }

    const handleChangeForObjects = (newValue, index, key) => {
      const formatedContent = Object.entries(content).reduce(
        (finalContent, [contentKey], contentIndex) => {
          const isSelectedIndex = contentIndex === index

          if (isSelectedIndex) delete finalContent[contentKey]

          return isSelectedIndex ? { ...finalContent, [key]: newValue } : finalContent
        },
        { ...content }
      )

      handleChange(formatedContent)
    }

    const handleChangeByType = isContentOnlyObject ? handleChangeForObjects : handleChangeForArrays

    return (
      <div className={className}>
        {title ? (
          <>
            <HighlightedEditableText
              title={title}
              isEditionEnabled={isKeyEditionEnabled}
              onChange={newTitle => handleChange(content, newTitle)}
            />
            <TwoDots>:</TwoDots>
            {` ${collapsingLabel}`}
          </>
        ) : (
          collapsingLabel
        )}
        {hasComa && isCollapsed && ','}

        <CollapseButton
          className={!hasRichContent ? 'disabled' : ''}
          disabled={!hasRichContent}
          onClick={handleCollapse}
        >
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
                  handleChange={(newValue, newKey) =>
                    handleChangeByType(newValue, index, newKey || key)
                  }
                />
              )
            })}

        {!isCollapsed && labels.CLOSE}
        {hasComa && !isCollapsed && ','}
      </div>
    )
  }

  return (
    <div className={className}>
      <span>
        {title ? (
          <>
            <HighlightedEditableText
              title={title}
              isEditionEnabled={isKeyEditionEnabled}
              onChange={newTitle => handleChange(content, newTitle)}
            />
            <TwoDots>:</TwoDots>
            <EditableText
              title={content}
              isEditionEnabled={isValueEditionEnabled}
              onChange={newContent => handleChange(newContent, title)}
              showTitleWithQuotes={isContentString}
            />
          </>
        ) : (
          <EditableText
            title={content}
            isEditionEnabled={isValueEditionEnabled}
            onChange={handleChange}
            showTitleWithQuotes={isContentString}
          />
        )}
        {hasComa && ','}
      </span>
    </div>
  )
}

const IdentedTree = styled(Tree)`
  padding: 3px 0 3px 20px;
  border-left: 5px solid ${t('transparent.300')};
`
const HighlightedEditableText = styled(EditableText)`
  color: ${t('cyan.800')};
`
