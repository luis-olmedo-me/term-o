import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import {
  getBackgroundedSections,
  getBgBorderMod
} from '@src/apps/sidepanel/components/ColoredText/ColoredText.helpers'
import { debounce } from '@src/helpers/utils.helpers'
import { text, textAreaInput, textAreaOverlay, textAreaWrapper } from './TextArea.module.scss'

export const TextArea = ({ onBlur, value, name, maxLines }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const [sections, setSections] = useState([])
  const [localValue, setLocalValue] = useState(value)

  const calculateSections = useCallback(value => {
    const newSections = getBackgroundedSections(value)

    setSections(newSections)
  }, [])
  const debouncedcalculateSections = useCallback(debounce(calculateSections, 200), [
    calculateSections
  ])

  useEffect(
    function changeSections() {
      let debounceTimeoutId = null

      const calculate = async () => {
        debounceTimeoutId = debouncedcalculateSections(localValue)
      }

      calculate()

      return () => clearTimeout(debounceTimeoutId)
    },
    [localValue]
  )

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
        {sections.map(({ bgcolor, content }, sectionIndex) => {
          const sectionMod = getBgBorderMod(sections, sectionIndex)

          return (
            <span className={sectionMod} key={sectionIndex} data-bgcolor={bgcolor}>
              {content.map(({ color, content }, index) => (
                <span className={text} key={`${sectionIndex}-${index}`} data-color={color}>
                  {content}
                </span>
              ))}
            </span>
          )
        })}
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
