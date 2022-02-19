import { useEffect, useState } from 'react'

const bodyWidth = document.body.clientWidth

export const useResize = ({ wrapperReference }) => {
  const [resizingFrom, setResizingFrom] = useState('')
  const [resizeData, setResizeData] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  useEffect(
    function setUpResizeEvent() {
      if (!resizingFrom || !wrapperReference) return

      const mouseHandler = (event) => {
        let newResizeData = {}

        switch (resizingFrom) {
          case 'left': {
            const wrapperOffsetLeft = wrapperReference.current.offsetLeft
            const newDistance = event.clientX - wrapperOffsetLeft

            newResizeData = { left: newDistance + wrapperOffsetLeft }
            break
          }

          case 'right': {
            newResizeData = { right: bodyWidth - event.clientX - 1 }
            break
          }

          case 'top': {
            const wrapperOffsetTop = wrapperReference.current.offsetTop
            const newDistance = event.clientY - wrapperOffsetTop

            newResizeData = { top: newDistance + wrapperOffsetTop }
            break
          }
          case 'bottom': {
            newResizeData = { bottom: innerHeight - event.clientY - 1 }
            break
          }
        }

        setResizeData((oldResizeData) => ({
          ...oldResizeData,
          ...newResizeData
        }))
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
