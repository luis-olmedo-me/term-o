import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import { debounce } from '@src/helpers/utils.helpers'
import { textAreaInput, textAreaOverlay, textAreaWrapper } from './TextArea.module.scss'

const createColorPositions = value => {
  console.log('💬 ~ value:', value)
  return []
}

export const TextArea = ({ onChange, onBlur, value, name, maxLines }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const [colorPositions, setColorPositions] = useState([])

  const calculateColorPositions = useCallback(value => {
    const newSuggestion = createColorPositions(value)

    setColorPositions(newSuggestion)
  }, [])
  const debouncedcalculateColorPositions = useCallback(debounce(calculateColorPositions, 200), [
    calculateColorPositions
  ])

  useEffect(
    function changeColorPositions() {
      let debounceTimeoutId = null

      const calculate = async () => {
        debounceTimeoutId = debouncedcalculateColorPositions(value)
      }

      calculate()

      return () => clearTimeout(debounceTimeoutId)
    },
    [value]
  )

  const syncScroll = () => {
    overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft
  }

  const handleBlur = event => {
    console.log('💬 ~ colorPositions:', colorPositions)
    onBlur(event)
  }

  return (
    <div className={textAreaWrapper}>
      <div ref={overlayRef} className={textAreaOverlay}>
        <span>{value}</span>
      </div>

      <textarea
        ref={textAreaRef}
        className={textAreaInput}
        rows={maxLines}
        name={name}
        value={value}
        onBlur={handleBlur}
        onInput={onChange}
        onKeyUp={syncScroll}
        onScroll={syncScroll}
        spellCheck="false"
      />
    </div>
  )
}

TextArea.propTypes = {
  onChange: Function,
  onBlur: Function,
  value: Boolean,
  maxLines: Number,
  name: String
}
