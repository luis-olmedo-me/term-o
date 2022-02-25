export const resizeTypes = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  MOVING: 'moving'
}

export const bodyHeight = Math.min(
  document.body.clientHeight,
  window.innerHeight - 1
)
export const bodyWidth = Math.min(
  document.body.clientWidth,
  window.innerWidth - 1
)

export const minimumValueAllowed = 0
