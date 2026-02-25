import { useRef } from 'preact/hooks'

import ColoredText from '@src/components/ColoredText'

import {
  coloredFragment,
  textAreaInput,
  textAreaOverlay,
  textAreaWrapper
} from './TextArea.module.scss'

export const TextArea = ({ onBlur, value, name, maxLines, onChange }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const syncScroll = () => {
    overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft
    overlayRef.current.scrollTop = textAreaRef.current.scrollTop
  }

  return (
    <div className={textAreaWrapper}>
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

      <div ref={overlayRef} className={textAreaOverlay}>
        <ColoredText fragmentClassName={coloredFragment} value={value} keywordsEnabled />
      </div>
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
