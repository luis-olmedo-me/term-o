import * as React from 'preact'
import { useEffect, useRef } from 'preact/hooks'

import ColoredText from '@sidepanel/components/ColoredText'
import useStorage from '@src/hooks/useStorage'

import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import * as S from './CommandsViewer.styles'

function getTextNodeAtOffset(root, offset) {
  let currentOffset = 0

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false)

  let node
  while ((node = walker.nextNode())) {
    const textLength = node.textContent.length

    if (currentOffset + textLength >= offset) {
      return {
        node,
        offset: offset - currentOffset
      }
    }

    currentOffset += textLength
  }

  return null
}

function getCaretOffset(element, event) {
  const range = document.caretRangeFromPoint(event.clientX, event.clientY)

  if (!range) return null

  let offset = range.startOffset
  let node = range.startContainer

  while (node && node !== element) {
    let prev = 0
    let sibling = node.previousSibling

    while (sibling) {
      prev += sibling.textContent.length
      sibling = sibling.previousSibling
    }

    offset += prev
    node = node.parentNode
  }

  return offset
}

function getTokenAt(text, offset) {
  const regex = /"[^\"]+"|\w[\w\-]*/g
  let match

  while ((match = regex.exec(text)) !== null) {
    const start = match.index
    const end = start + match[0].length

    if (offset >= start && offset <= end) {
      return { token: match[0], start, end }
    }
  }

  return null
}

function selectToken(element, startIndex, endIndex) {
  const selection = window.getSelection()
  selection.removeAllRanges()

  const startPos = getTextNodeAtOffset(element, startIndex)
  const endPos = getTextNodeAtOffset(element, endIndex)

  if (!startPos || !endPos) return

  const range = document.createRange()
  range.setStart(startPos.node, startPos.offset)
  range.setEnd(endPos.node, endPos.offset)

  selection.addRange(range)
}

export const CommandsViewer = ({ commands }) => {
  const wrapper = useRef(null)

  const [config] = useStorage({ key: storageKeys.CONFIG })
  const statusIndicator = config.getValueById(configInputIds.STATUS_INDICATOR)
  const hasStatusBar = config.getValueById(configInputIds.STATUS_BAR)
  const hasStatusLight = config.getValueById(configInputIds.STATUS_LIGHT)
  const isTruncated = config.getValueById(configInputIds.LINE_TRUNCATION)

  useEffect(
    function listenUpdates() {
      const commandElements = wrapper.current?.children
      const lastCommandElement = commandElements.item(commandElements.length - 1)

      const timeoutId = setTimeout(
        () => lastCommandElement?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
        0
      )

      return () => clearTimeout(timeoutId)
    },
    [commands]
  )

  const handleLineClick = event => {
    let line = event.target

    while (line && line.tagName !== 'P') {
      line = line.parentElement
    }

    const text = line.textContent
    const offset = getCaretOffset(line, event)

    const result = getTokenAt(text, offset)

    if (result) {
      selectToken(line, result.start, result.end)
    }
  }

  return (
    <S.ViewWrapper className="vertical-scroller">
      <div ref={wrapper}>
        {commands.map(command => {
          const hasErrorMessage = command.status === commandStatuses.ERROR
          const contextLines = command.context.split(/(?<!\\)\n/).filter(Boolean)

          return (
            <S.Command
              key={command.id}
              aria-status={command.status}
              aria-origin={hasStatusBar ? command.origin : null}
              aria-indicator={statusIndicator}
              aria-light={hasStatusLight}
              aria-truncated={isTruncated}
            >
              {contextLines.map((context, index) => (
                <S.Line
                  key={`${context}-${index}`}
                  onClick={handleLineClick}
                  aria-truncate-skip="false"
                >
                  <ColoredText value={context} />
                </S.Line>
              ))}

              <S.Line aria-truncate-skip="false" onClick={handleLineClick}>
                <ColoredText value={command.title} />
              </S.Line>

              {command.updates.map(update => {
                return (
                  <S.Line
                    key={update}
                    onClick={handleLineClick}
                    aria-truncate-skip={hasErrorMessage}
                  >
                    <ColoredText value={update} />
                  </S.Line>
                )
              })}

              {command.warning && (
                <S.Line
                  key={command.warning}
                  aria-truncate-skip="true"
                  aria-warning="true"
                  onClick={handleLineClick}
                >
                  <ColoredText value={command.warning} />
                </S.Line>
              )}
            </S.Command>
          )
        })}
      </div>
    </S.ViewWrapper>
  )
}

CommandsViewer.propTypes = {
  commands: Array
}
