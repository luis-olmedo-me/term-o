const getTextNodeAtOffset = (root, offset) => {
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

export const getCaretOffset = (element, event) => {
  const x = event.clientX
  const y = event.clientY

  let position = document.caretPositionFromPoint?.(x, y)

  if (!position) return null

  let node = position.offsetNode
  let offset = position.offset

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

export const getTokenAt = (text, offset) => {
  const regex = /"[^"]+"|'[^']+'|\{[^}]+\}|[\w-]+:\/\/[\w\-./]+|[\w.-]+/g
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

export const selectToken = (element, startIndex, endIndex) => {
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
