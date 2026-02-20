import { useRef, useState } from 'preact/hooks'

import { textAreaInput, textAreaOverlay, textAreaWrapper } from './TextArea.module.scss'

export const TextArea = ({ onBlur, value, name, maxLines }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const [localValue, setLocalValue] = useState(value)

  const syncScroll = () => {
    overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft
  }

  const handleBlur = event => {
    onBlur(event)
  }

  const handleChange = event => {
    setLocalValue(event.target.value)
  }

  return (
    <div className={textAreaWrapper}>
      <div ref={overlayRef} className={textAreaOverlay}>
        <span>{localValue}</span>
      </div>

      <textarea
        ref={textAreaRef}
        className={textAreaInput}
        rows={maxLines}
        name={name}
        value={localValue}
        onBlur={handleBlur}
        onInput={handleChange}
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
