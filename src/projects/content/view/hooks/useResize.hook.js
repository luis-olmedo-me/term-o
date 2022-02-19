import { useEffect, useState } from 'react'

const bodyWidth = document.body.clientWidth
const bodyHeight = document.body.clientHeight

const minimumValueAllowed = 100

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
