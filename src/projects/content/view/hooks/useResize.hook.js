import { useEffect, useState } from 'react'

const bodyWidth = document.body.clientWidth
const bodyHeight = document.body.clientHeight

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
            newResizeData = { left: event.clientX }
            break
          }

          case 'right': {
            newResizeData = { right: bodyWidth - event.clientX - 1 }
            break
          }

          case 'top': {
            newResizeData = { top: event.clientY }
            break
          }

          case 'bottom': {
            newResizeData = { bottom: bodyHeight - event.clientY - 1 }
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
