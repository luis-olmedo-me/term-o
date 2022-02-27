export const resizeTypes = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  MOVING: 'moving'
}

export const singleResizeTypes = [
  resizeTypes.LEFT,
  resizeTypes.RIGHT,
  resizeTypes.TOP,
  resizeTypes.BOTTOM
]

const bodyHeight = Math.min(document.body.clientHeight, window.innerHeight - 1)
const bodyWidth = Math.min(document.body.clientWidth, window.innerWidth - 1)

export const defaultBodyData = {
  width: bodyWidth,
  height: bodyHeight
}

export const minimumValueAllowed = 0
