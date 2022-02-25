export const getResizeData = ({
  mousePositionX,
  mousePositionY,
  resizeType
}) => {
  switch (resizeType) {
    case 'left': {
      const shouldFixLeft = minimumValueAllowed > mousePositionX

      return { left: shouldFixLeft ? 0 : mousePositionX }
    }

    case 'right': {
      const right = bodyWidth - mousePositionX - 1
      const shouldFixRight = minimumValueAllowed > right

      return { right: shouldFixRight ? 0 : right }
    }

    case 'top': {
      const shouldFixTop = minimumValueAllowed > mousePositionY

      return { top: shouldFixTop ? 0 : mousePositionY }
    }

    case 'bottom': {
      const bottom = bodyHeight - mousePositionY - 1
      const shouldFixBottom = minimumValueAllowed > bottom

      return { bottom: shouldFixBottom ? 0 : bottom }
    }

    case 'moving': {
      const offsetX = mousePositionX - movingFrom.x
      const offsetY = mousePositionX - movingFrom.y

      const left = offsetX + resizeData.left
      const top = offsetY + resizeData.top
      const right = resizeData.right - offsetX
      const bottom = resizeData.bottom - offsetY

      return { left, top, right, bottom }
    }
  }
}
