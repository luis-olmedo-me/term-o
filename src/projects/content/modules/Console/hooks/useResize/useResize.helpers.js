import { minimumValueAllowed, resizeTypes } from './useResize.constants'
import { debounce } from 'src/helpers/utils.helpers.js'
import { updateConsolePosition } from 'src/helpers/event.helpers'

export const limitLowValue = (value) => (value < 0 ? 0 : value)

export const isNumber = (value) => typeof value === 'number'

const validateSide = (side, oppositeSide, mockDistance) => {
  const isSideOutside = side < 0
  const isOppositeSideOutside = oppositeSide < 0

  return isSideOutside
    ? 0
    : isOppositeSideOutside
    ? mockDistance
    : limitLowValue(side)
}

export const getNewResizeData = ({
  mousePosition: { x: mousePositionX, y: mousePositionY },
  pivotPosition: { x: pivotPositionX, y: pivotPositionY },
  bodyData: { width: bodyWidth, height: bodyHeight },
  mockDistance: { x: mockDistanceX, y: mockDistanceY },
  resizeType,
  resizeData
}) => {
  switch (resizeType) {
    case resizeTypes.LEFT: {
      const shouldFixLeft = minimumValueAllowed > mousePositionX
      const isBelowMiniumWidth =
        bodyWidth - (mousePositionX + resizeData.right) < 400

      return !isBelowMiniumWidth
        ? { left: shouldFixLeft ? 0 : mousePositionX }
        : {}
    }

    case resizeTypes.RIGHT: {
      const right = bodyWidth - mousePositionX - 1
      const shouldFixRight = minimumValueAllowed > right
      const isBelowMiniumWidth = bodyWidth - (resizeData.left + right) < 400

      return !isBelowMiniumWidth ? { right: shouldFixRight ? 0 : right } : {}
    }

    case resizeTypes.TOP: {
      const shouldFixTop = minimumValueAllowed > mousePositionY
      const isBelowMiniumHeight =
        bodyHeight - (mousePositionY + resizeData.bottom) < 400

      return !isBelowMiniumHeight
        ? { top: shouldFixTop ? 0 : mousePositionY }
        : {}
    }

    case resizeTypes.BOTTOM: {
      const bottom = bodyHeight - mousePositionY - 1
      const shouldFixBottom = minimumValueAllowed > bottom
      const isBelowMiniumHeight = bodyHeight - (resizeData.top + bottom) < 400

      return !isBelowMiniumHeight
        ? { bottom: shouldFixBottom ? 0 : bottom }
        : {}
    }

    case resizeTypes.MOVING: {
      const offsetX = mousePositionX - pivotPositionX
      const offsetY = mousePositionY - pivotPositionY

      const left = offsetX + resizeData.left
      const top = offsetY + resizeData.top
      const right = resizeData.right - offsetX
      const bottom = resizeData.bottom - offsetY

      return {
        left: validateSide(left, right, mockDistanceX),
        right: validateSide(right, left, mockDistanceX),
        top: validateSide(top, bottom, mockDistanceY),
        bottom: validateSide(bottom, top, mockDistanceY)
      }
    }
  }
}

export const updateConfig = debounce(updateConsolePosition, 800)
