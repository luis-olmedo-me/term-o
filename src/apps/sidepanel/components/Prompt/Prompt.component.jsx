import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

import ColoredText from '@sidepanel/components/ColoredText'
import useStorage from '@src/hooks/useStorage'

import { configInputIds, PROMPT_MARK } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { debounce } from '@src/helpers/utils.helpers'
import { createSuggestion } from './Prompt.helpers'
import {
  promptInput,
  promptInputWrapper,
  promptLine,
  promptOverlay,
  promptSuggestion,
  promptWrapper,
  prompWithPrefix
} from './Prompt.module.scss'

export const Prompt = ({ onEnter, onFocus, onBlur, inputRef, context, name, loading = false }) => {
  const [value, setValue] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [historialIndex, setHistorialIndex] = useState(0)
  const [caret, setCaret] = useState(0)

  const overlayRef = useRef(null)

  const [historial, setHistorial] = useStorage({ key: storageKeys.PROMPT_HISTORY })
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const historialSize = config.getValueById(configInputIds.HISTORIAL_SIZE)
  const statusIndicator = config.getValueById(configInputIds.STATUS_INDICATOR)
  const isTruncated = config.getValueById(configInputIds.LINE_TRUNCATION)

  const calculateSuggestion = useCallback(value => {
    const newSuggestion = createSuggestion(value)

    setSuggestion(newSuggestion)
  }, [])
  const debouncedCalculateSuggestion = useCallback(debounce(calculateSuggestion, 200), [
    calculateSuggestion
  ])

  useEffect(
    function changeSuggestion() {
      const debounceTimeoutId = debouncedCalculateSuggestion(value)

      return () => {
        clearTimeout(debounceTimeoutId)
      }
    },
    [caret, value]
  )

  const syncScroll = () => {
    overlayRef.current.scrollLeft = inputRef.current.scrollLeft
  }

  const addHistoryValueConditionally = targetValue => {
    setHistorial(history => {
      const lastHistoryValue = history.at(-1)
      const isRepeatedAtEnd = lastHistoryValue === targetValue
      const newHistory = isRepeatedAtEnd ? history : [...history, targetValue]

      return newHistory.slice(historialSize * -1)
    })
  }

  const handleKeyDown = event => {
    const key = event.key
    const targetValue = event.target.value

    setSuggestion('')

    if (key === 'ArrowUp') {
      event.preventDefault()

      setHistorialIndex(index => {
        const newIndex = index - 1
        const canBeStored = newIndex * -1 <= historial.length

        return canBeStored ? newIndex : index
      })

      return
    }

    if (key === 'ArrowDown') {
      event.preventDefault()

      setHistorialIndex(index => {
        const newIndex = index + 1
        const canBeStored = newIndex <= 0

        return canBeStored ? newIndex : index
      })

      return
    }

    if (loading) return

    if (key === 'Enter' && targetValue) {
      onEnter(targetValue)
      addHistoryValueConditionally(targetValue)
      setHistorialIndex(0)
      setValue('')

      return
    }

    if (historialIndex) setHistorialIndex(0)
  }

  const handleChange = event => {
    syncScroll()
    setValue(event.target.value)
  }

  const handleKeyUp = event => {
    syncScroll()
    setCaret(event.target.selectionStart)
  }

  const prefix = historialIndex || PROMPT_MARK
  const contextLines = context.split(/(?<!\\)\n/).filter(Boolean)

  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  return (
    <div data-loading={loading} data-indicator={statusIndicator} className={promptWrapper}>
      {contextLines.map((contextLine, index) => (
        <p key={`${contextLine}-${index}`} className={promptLine} data-truncated={isTruncated}>
          <ColoredText value={contextLine} />
        </p>
      ))}

      <div className={prompWithPrefix}>
        <span>{prefix}</span>

        <div className={promptInputWrapper}>
          <div ref={overlayRef} className={promptOverlay}>
            {start}
            <span className={promptSuggestion}>{suggestion}</span>
            {end}
          </div>

          <input
            spellCheck={false}
            ref={inputRef}
            className={promptInput}
            name={name}
            type="text"
            value={value}
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
            onScroll={syncScroll}
          />
        </div>
      </div>
    </div>
  )
}

Prompt.propTypes = {
  onEnter: Function,
  onFocus: Function,
  onBlur: Function,
  inputRef: Object,
  context: String,
  loading: Boolean,
  name: String
}
