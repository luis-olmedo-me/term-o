import { useMemo, useRef } from 'preact/hooks'

import { colorThemeKeys } from '@src/constants/themes.constants'
import {
  bothColored,
  nextColored,
  previousColored,
  textAreaInput,
  textAreaOverlay,
  textAreaWrapper,
  uniqueColored
} from './TextArea.module.scss'

const colorPattern = /\[termo\.(color|bgcolor)\.([A-Za-z]+)\]/g

const getPaintedFragments = value => {
  const matches = value.matchAll(colorPattern)?.toArray() || []
  let results = []
  let lastColor = colorThemeKeys.RESET
  let lastBGColor = colorThemeKeys.RESET

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index]
    const matchValue = match.at(0)
    const category = match.at(1)
    const color = match.at(2)

    const nextMatch = matches[index + 1]

    const start = match.index + matchValue.length
    const extraction = nextMatch ? value.slice(start, nextMatch.index) : value.slice(start)

    const isColorKey = category === 'color'

    if (isColorKey) lastColor = color
    else lastBGColor = color

    results.push({
      value: matchValue,
      color: colorThemeKeys.PURPLE,
      bgcolor: colorThemeKeys.RESET
    })

    results.push({
      value: extraction,
      color: lastColor,
      bgcolor: lastBGColor
    })
  }

  return results
}

export const getBorderClass = (fragments, index) => {
  const nextFragment = fragments[index + 1]
  const previousFragment = fragments[index - 1]
  const currentFragment = fragments[index]

  const isNextColored = nextFragment && nextFragment.bgcolor !== colorThemeKeys.RESET
  const isPreviousColored = previousFragment && previousFragment.bgcolor !== colorThemeKeys.RESET
  const isCurrentColored = currentFragment && currentFragment.bgcolor !== colorThemeKeys.RESET

  if (isNextColored && !isPreviousColored) return nextColored
  if (isPreviousColored && !isNextColored) return previousColored
  if (isNextColored && isPreviousColored) return bothColored
  if (!isNextColored && !isPreviousColored && isCurrentColored) return uniqueColored
  return undefined
}

export const TextArea = ({ onBlur, value, name, maxLines, onChange }) => {
  const overlayRef = useRef(null)
  const textAreaRef = useRef(null)

  const paintedFragments = useMemo(() => getPaintedFragments(value), [value])

  const syncScroll = () => {
    overlayRef.current.scrollLeft = textAreaRef.current.scrollLeft
    overlayRef.current.scrollTop = textAreaRef.current.scrollTop
  }

  return (
    <div className={textAreaWrapper}>
      <div ref={overlayRef} className={textAreaOverlay}>
        {paintedFragments.map((fragment, index) => {
          const className = getBorderClass(paintedFragments, index)

          return (
            <span
              key={`${index}-${fragment.value}`}
              data-bgcolor={fragment.bgcolor}
              data-color={fragment.color}
              className={className}
            >
              {fragment.value}
            </span>
          )
        })}
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
