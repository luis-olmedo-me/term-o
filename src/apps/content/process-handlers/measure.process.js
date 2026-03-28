import { getElementByXPath } from '../helpers/dom-locator.helpers'

export default async (resolve, reject, data) => {
  const { start, end } = data

  const elementStart = getElementByXPath(start)
  const elementEnd = getElementByXPath(end)

  if (!elementStart) return reject('XPath did not match any element.')
  if (!elementEnd) return reject('XPath did not match any element.')

  const result = getDistanceBetweenElements(elementStart, elementEnd)

  resolve(result)
}

function getDistanceBetweenElements(elementA, elementB) {
  const rectA = elementA.getBoundingClientRect()
  const rectB = elementB.getBoundingClientRect()

  let distanceX = 0
  let directionX = null

  if (rectA.right < rectB.left) {
    distanceX = rectB.left - rectA.right
    directionX = 'right'
  } else if (rectB.right <= rectA.left) {
    distanceX = rectA.left - rectB.right
    directionX = 'left'
  }

  let distanceY = 0
  let directionY = null

  if (rectA.bottom < rectB.top) {
    distanceY = rectB.top - rectA.bottom
    directionY = 'down'
  } else if (rectB.bottom <= rectA.top) {
    distanceY = rectA.top - rectB.bottom
    directionY = 'up'
  }

  const centerA = {
    x: rectA.left + rectA.width / 2,
    y: rectA.top + rectA.height / 2
  }

  const centerB = {
    x: rectB.left + rectB.width / 2,
    y: rectB.top + rectB.height / 2
  }

  const deltaCenter = {
    x: centerB.x - centerA.x,
    y: centerB.y - centerA.y
  }

  const euclideanDistance = Math.hypot(deltaCenter.x, deltaCenter.y)

  return {
    distanceX,
    distanceY,
    directionX,
    directionY,
    deltaCenter,
    euclideanDistance,
    centers: { a: centerA, b: centerB },
    rects: { a: rectA, b: rectB }
  }
}
