import { minimumValueAllowed, resizeTypes } from './useResize.constants'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { debounce } from 'src/helpers/utils.helpers.js'

export const getNewResizeData = ({
  mousePositionX,
  mousePositionY,
  tripodPositionX,
  tripodPositionY,
  resizeType,
  resizeData,
  bodyData: { width: bodyWidth, height: bodyHeight }
}) => {
  switch (resizeType) {
    case resizeTypes.LEFT: {
      const shouldFixLeft = minimumValueAllowed > mousePositionX

      return { left: shouldFixLeft ? 0 : mousePositionX }
    }

    case resizeTypes.RIGHT: {
      const right = bodyWidth - mousePositionX - 1
      const shouldFixRight = minimumValueAllowed > right

      return { right: shouldFixRight ? 0 : right }
    }

    case resizeTypes.TOP: {
      const shouldFixTop = minimumValueAllowed > mousePositionY

      return { top: shouldFixTop ? 0 : mousePositionY }
    }

    case resizeTypes.BOTTOM: {
      const bottom = bodyHeight - mousePositionY - 1
      const shouldFixBottom = minimumValueAllowed > bottom

      return { bottom: shouldFixBottom ? 0 : bottom }
    }

    case resizeTypes.MOVING: {
      const offsetX = mousePositionX - tripodPositionX
      const offsetY = mousePositionY - tripodPositionY

      const left = offsetX + resizeData.left
      const top = offsetY + resizeData.top
      const right = resizeData.right - offsetX
      const bottom = resizeData.bottom - offsetY

      return { left, top, right, bottom }
    }
  }
}

export const updateConfig = debounce(function updateResizeData(data) {
  backgroundRequest({
    eventType: eventTypes.UPDATE_CONFIG_CONSOLE_POSITION,
    data
  })
}, 800)
