import { minimumValueAllowed, resizeTypes } from './useResize.constants'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { debounce } from 'src/helpers/utils.helpers.js'

export const limitLowValue = (value) => (value < 0 ? 0 : value)

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

      const isLeftOutside = left < 0
      const isRightOutside = right < 0
      const isTopOutside = top < 0
      const isBottomOutside = bottom < 0

      return {
        left: isLeftOutside
          ? 0
          : isRightOutside
          ? mockDistanceX
          : limitLowValue(left),
        right: isRightOutside
          ? 0
          : isLeftOutside
          ? mockDistanceX
          : limitLowValue(right),
        top: isTopOutside
          ? 0
          : isBottomOutside
          ? mockDistanceY
          : limitLowValue(top),
        bottom: isBottomOutside
          ? 0
          : isTopOutside
          ? mockDistanceY
          : limitLowValue(bottom)
      }
    }
  }
}

export const updateConfig = debounce((data) => {
  backgroundRequest({
    eventType: eventTypes.UPDATE_CONFIG_CONSOLE_POSITION,
    data
  })
}, 800)
