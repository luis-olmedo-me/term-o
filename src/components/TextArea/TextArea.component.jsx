import { useRef } from 'preact/hooks'

import { textAreaInput, textAreaOverlay, textAreaWrapper } from './TextArea.module.scss'

export const TextArea = ({ onBlur, value, name, maxLines, onChange }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const syncScroll = () => {
    overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft
    overlayRef.current.scrollTop = textAreaRef.current.scrollTop
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
        onBlur={onBlur}
        onInput={onChange}
        onKeyDown={syncScroll}
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
