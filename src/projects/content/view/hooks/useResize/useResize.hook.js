import { useEffect, useState } from 'react'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { getNewResizeData, updateConfig } from './useResize.helpers'
import { debounce } from 'src/helpers/utils.helpers.js'
import { defaultBodyData } from './useResize.constants'

export const useResize = ({ wrapperReference }) => {
  const [resizingFrom, setResizingFrom] = useState('')
  const [movingFrom, setMovingFrom] = useState(null)
  const [resizeData, setResizeData] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  const [bodyData, setBodyData] = useState(defaultBodyData)

  useEffect(
    function expectForBodyChanges() {
      if (!wrapperReference?.current) return

      const updateData = debounce(() => {
        setResizeData({
          left: parseInt(wrapperReference.current.style.left),
          right: parseInt(wrapperReference.current.style.right),
          top: parseInt(wrapperReference.current.style.top),
          bottom: parseInt(wrapperReference.current.style.bottom)
        })

        setBodyData({
          width: Math.min(document.body.clientWidth, window.innerWidth - 1),
          height: Math.min(document.body.clientHeight, window.innerHeight - 1)
        })
      }, 1000)

      const obsever = new ResizeObserver(updateData)

      obsever.observe(document.body)

      return () => obsever.unobserve(document.body)
    },
    [wrapperReference]
  )

  useEffect(function expectForBodyChanges() {
    const updateBodyData = debounce(function outputsize() {
      setBodyData({
        width: Math.min(document.body.clientWidth, window.innerWidth - 1),
        height: Math.min(document.body.clientHeight, window.innerHeight - 1)
      })
    }, 500)

    const obsever = new ResizeObserver(updateBodyData)

    obsever.observe(document.body)

    return () => obsever.unobserve(document.body)
  }, [])

  useEffect(function getConfigurationFromBackground() {
    const receiveConfiguration = ({ response: receivedConfiguration }) => {
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

      let animationId = null
      let mousePosition = null

      const mouseHandler = (event) => {
        mousePosition = {
          x: event.clientX,
          y: event.clientY
        }
      }

      const onAnimationFrame = () => {
        if (mousePosition) {
          const newResizeData = getNewResizeData({
            mousePositionX: mousePosition.x,
            mousePositionY: mousePosition.y,
            tripodPositionX: movingFrom?.x,
            tripodPositionY: movingFrom?.y,
            resizeType: resizingFrom,
            resizeData,
            bodyData
          })

          setResizeData((oldResizeData) => ({
            ...oldResizeData,
            ...newResizeData
          }))
          updateConfig(newResizeData)

          mousePosition = null
        }

        animationId = window.requestAnimationFrame(onAnimationFrame)
      }

      const removeResizeListener = () => {
        window.removeEventListener('mouseup', removeResizeListener)
        window.removeEventListener('mousemove', mouseHandler)
        window.cancelAnimationFrame(animationId)
      }

      animationId = window.requestAnimationFrame(onAnimationFrame)
      addEventListener('mouseup', removeResizeListener)
      addEventListener('mousemove', mouseHandler)

      return removeResizeListener
    },
    [resizingFrom, wrapperReference, bodyData]
  )

  return {
    setResizingFrom,
    resizeData,
    setMovingFrom,
    isMoving: Boolean(movingFrom),
    bodyData
  }
}
