import { useRef } from 'preact/hooks'

import { textAreaInput, textAreaOverlay, textAreaWrapper } from './TextArea.module.scss'

const colorPattern = /\[termo\.(color|bgcolor)\.([A-Za-z]+)\]/g

const parser = value => {
  const matches = value.matchAll(colorPattern)?.toArray() || []
  let results = []
  let lastColor = 'reset'
  let lastBGColor = 'reset'

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index]
    const matchValue = match.at(0)
    const category = match.at(1)
    const color = match.at(2)

    const isColorKey = category === 'color'

    if (isColorKey) lastColor = color
    else lastBGColor = color

    results.push({
      value: matchValue,
      color: 'brightBlack',
      bgcolor: 'white'
    })

    results.push({
      value: 'testing the content',
      color: lastColor,
      bgcolor: lastBGColor
    })
  }

  console.log('💬 ~ results:', results)

  return 'test'
}

export const TextArea = ({ onBlur, value, name, maxLines, onChange }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  parser(value)

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
