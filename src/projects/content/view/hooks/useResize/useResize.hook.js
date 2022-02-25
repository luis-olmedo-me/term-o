import { useEffect, useState } from 'react'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { getNewResizeData, updateConfig } from './useResize.helpers'

export const useResize = ({ wrapperReference }) => {
  const [resizingFrom, setResizingFrom] = useState('')
  const [movingFrom, setMovingFrom] = useState(null)
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
        const newResizeData = getNewResizeData({
          mousePositionX: event.clientX,
          mousePositionY: event.clientY,
          tripodPositionX: movingFrom?.x,
          tripodPositionY: movingFrom?.y,
          resizeType: resizingFrom,
          resizeData
        })

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

  return { setResizingFrom, resizeData, setMovingFrom }
}
