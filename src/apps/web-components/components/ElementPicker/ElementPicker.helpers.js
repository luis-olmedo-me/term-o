import { getPaintedFragments } from '@src/components/ColoredText/ColoredText.helpers'

export const calculatePosition = (element, pointX, pointY) => {
  const errorGap = 15
  const marginGap = 10

  const width = element.clientWidth
  const height = element.clientHeight
  const limitX = window.innerWidth - errorGap
  const limitY = window.innerHeight - errorGap

  let sideX = null
  let sideY = null

  if (pointX + width < limitX) sideX = pointX + marginGap
  else sideX = pointX - width - marginGap

  if (pointY + height < limitY) sideY = pointY + marginGap
  else sideY = pointY - height - marginGap

  return [sideX, sideY]
}

export const createPaintedElement = text => {
  const lineElement = document.createElement('p')
  const fragments = getPaintedFragments(text)

  lineElement.setAttribute('class', 'line')
  for (const fragment of fragments) {
    const spanElement = document.createElement('span')
    spanElement.setAttribute('data-bgcolor', fragment.bgcolor)
    spanElement.setAttribute('data-color', fragment.color)
    spanElement.setAttribute('class', 'colored')

    spanElement.innerText = fragment.value
    lineElement.append(spanElement)
  }

  return lineElement
}
