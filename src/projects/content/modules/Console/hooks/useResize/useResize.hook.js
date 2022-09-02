import { useEffect, useState } from 'react'
import {
  getNewResizeData,
  isNumber,
  limitLowValue,
  updateConfig
} from './useResize.helpers'
import { debounce } from 'src/helpers/utils.helpers.js'
import { defaultBodyData } from './useResize.constants'
import { eventTypes } from 'src/constants/events.constants.js'

export const useResize = ({ wrapperReference, consolePosition }) => {
  const [resizingFrom, setResizingFrom] = useState('')
  const [movingFrom, setMovingFrom] = useState(null)
  const [resizeData, setResizeData] = useState({
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  })

  const [bodyData, setBodyData] = useState(defaultBodyData)

  useEffect(
    function expectForBodyChanges() {
      if (!wrapperReference?.current) return

      const updateData = debounce(() => {
        const newBodyData = {
          width: Math.min(document.body.clientWidth, window.innerWidth - 1),
          height: Math.min(document.body.clientHeight, window.innerHeight - 1)
        }
        const newResizeData = {
          left: parseInt(wrapperReference.current.style.left),
          right: parseInt(wrapperReference.current.style.right),
          top: parseInt(wrapperReference.current.style.top),
          bottom: parseInt(wrapperReference.current.style.bottom)
        }

        const isBelowMiniumWidth =
          newBodyData.width - (newResizeData.left + newResizeData.right) < 400
        const isBelowMiniumHeight =
          newBodyData.height - (newResizeData.top + newResizeData.bottom) < 400

        const formattedData = {
          left: isBelowMiniumWidth ? 10 : limitLowValue(newResizeData.left),
          right: isBelowMiniumWidth ? 10 : limitLowValue(newResizeData.right),
          top: isBelowMiniumHeight ? 10 : limitLowValue(newResizeData.top),
          bottom: isBelowMiniumHeight ? 10 : limitLowValue(newResizeData.bottom)
        }

        updateConfig(formattedData)
        setResizeData(formattedData)
        setBodyData(newBodyData)
      }, 500)

      const obsever = new ResizeObserver(updateData)

      obsever.observe(document.body)

      return () => obsever.unobserve(document.body)
    },
    [wrapperReference]
  )

  useEffect(() => {
    const resizeCommandHandler = (event) => {
      const side = event.detail.side

      switch (side) {
        case 'right':
          setResizeData({
            left: bodyData.width - 460,
            top: 10,
            right: 10,
            bottom: 10
          })
          break
      }
    }

    window.addEventListener(eventTypes.TERM_O_RESIZE, resizeCommandHandler)

    return () =>
      window.removeEventListener(eventTypes.TERM_O_RESIZE, resizeCommandHandler)
  }, [bodyData])

  useEffect(
    function getConfigurationFromBackground() {
      const hasConsolePosition = Object.keys(consolePosition).length > 0

      if (!hasConsolePosition) return

      setResizeData({
        left: isNumber(consolePosition?.left) ? consolePosition.left : 10,
        right: isNumber(consolePosition?.right) ? consolePosition.right : 10,
        top: isNumber(consolePosition?.top) ? consolePosition.top : 10,
        bottom: isNumber(consolePosition?.bottom) ? consolePosition.bottom : 10
      })
    },
    [consolePosition]
  )

  useEffect(
    function setUpResizeEvent() {
      if (!resizingFrom || !wrapperReference) return

      let animationId = null
      let mousePosition = null
      const mockDistance = {
        x: bodyData.width - wrapperReference.current.clientWidth,
        y: bodyData.height - wrapperReference.current.clientHeight
      }

      const mouseHandler = (event) => {
        mousePosition = {
          x: event.clientX,
          y: event.clientY
        }
      }

      const onAnimationFrame = () => {
        if (mousePosition) {
          const newResizeData = getNewResizeData({
            mockDistance,
            mousePosition: { x: mousePosition.x, y: mousePosition.y },
            pivotPosition: { x: movingFrom?.x, y: movingFrom?.y },
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

        setMovingFrom(null)
        setResizingFrom('')
      }

      animationId = window.requestAnimationFrame(onAnimationFrame)
      window.addEventListener('mouseup', removeResizeListener)
      window.addEventListener('mousemove', mouseHandler, { passive: true })

      return removeResizeListener
    },
    [resizingFrom, wrapperReference, bodyData]
  )

  return {
    setResizingFrom,
    resizeData,
    setMovingFrom,
    isMoving: Boolean(movingFrom)
  }
}
