import { useRef, useState } from 'preact/hooks'

import ColoredText from '@src/components/ColoredText'

import {
  textarea,
  textarea__colored_fragment,
  textarea__input,
  textarea__overlay
} from './TextArea.module.scss'

export const TextArea = ({ onBlur, value, name, maxLines, onChange }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const [showKeywords, setShowKeywords] = useState(false)

  const syncScroll = () => {
    overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft
    overlayRef.current.scrollTop = textAreaRef.current.scrollTop
  }

  const handleBlur = event => {
    setShowKeywords(false)
    onBlur(event)
  }

  return (
    <div className={textarea}>
      <textarea
        ref={textAreaRef}
        className={textarea__input}
        rows={maxLines}
        name={name}
        value={value}
        onInput={onChange}
        onKeyDown={syncScroll}
        onScroll={syncScroll}
        onBlur={handleBlur}
        onFocus={() => setShowKeywords(true)}
        spellCheck="false"
      />

      <div ref={overlayRef} className={textarea__overlay}>
        <ColoredText
          fragmentClassName={textarea__colored_fragment}
          value={value}
          keywordsEnabled={showKeywords}
          hideArtificialSpaces
        />
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
