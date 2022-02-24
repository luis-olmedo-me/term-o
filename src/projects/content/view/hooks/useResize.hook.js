import { useCallback, useEffect, useState } from 'react'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { debounce } from 'src/helpers/utils.helpers.js'

const bodyWidth = document.body.clientWidth
const bodyHeight = document.body.clientHeight

const minimumValueAllowed = 0

const updateConfig = debounce(function updateResizeData(data) {
  backgroundRequest({
    eventType: eventTypes.UPDATE_CONFIG_CONSOLE_POSITION,
    data
  })
}, 800)

export const useResize = ({ wrapperReference }) => {
  const [resizingFrom, setResizingFrom] = useState('')
  const [resizeData, setResizeData] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  useEffect(function getConfigurationFromBackground() {
    const receiveConfiguration = ({ response: receivedConfiguration }) => {
      console.log('receivedConfiguration', receivedConfiguration)
      setResizeData({
        left: receivedConfiguration?.consolePosition?.left || 0,
        right: receivedConfiguration?.consolePosition?.right || 0,
        top: receivedConfiguration?.consolePosition?.top || 0,
        bottom: receivedConfiguration?.consolePosition?.bottom || 0
      })
    }

    backgroundRequest({
      eventType: eventTypes.GET_CONFIGURATION,
      callback: receiveConfiguration
    })
  }, [])

  useEffect(
    function setUpResizeEvent() {
      if (!resizingFrom || !wrapperReference) return

      const mouseHandler = (event) => {
        let newResizeData = {}

        switch (resizingFrom) {
          case 'left': {
            const shouldFixLeft = minimumValueAllowed > event.clientX

            newResizeData = { left: shouldFixLeft ? 0 : event.clientX }
            break
          }

          case 'right': {
            const right = bodyWidth - event.clientX - 1
            const shouldFixRight = minimumValueAllowed > right

            newResizeData = { right: shouldFixRight ? 0 : right }
            break
          }

          case 'top': {
            const shouldFixTop = minimumValueAllowed > event.clientY

            newResizeData = { top: shouldFixTop ? 0 : event.clientY }
            break
          }

          case 'bottom': {
            const bottom = bodyHeight - event.clientY - 1
            const shouldFixBottom = minimumValueAllowed > bottom

            newResizeData = { bottom: shouldFixBottom ? 0 : bottom }
            break
          }
        }

        setResizeData((oldResizeData) => ({
          ...oldResizeData,
          ...newResizeData
        }))

        updateConfig(newResizeData)
      }

      const removeResizeListener = () => {
        window.removeEventListener('mousemove', mouseHandler)
        window.removeEventListener('mouseup', removeResizeListener)
      }

      addEventListener('mousemove', mouseHandler)
      addEventListener('mouseup', removeResizeListener)

      return removeResizeListener
    },
    [resizingFrom, wrapperReference]
  )

  return { setResizingFrom, resizeData }
}
