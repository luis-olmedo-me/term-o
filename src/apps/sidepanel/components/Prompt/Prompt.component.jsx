import { useState } from 'preact/hooks'

import ColoredText from '@sidepanel/components/ColoredText'
import useStorage from '@src/hooks/useStorage'

import { configInputIds, PROMPT_MARK } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import {
  promptInput,
  promptInputWrapper,
  promptLine,
  promptOverlay,
  promptSuggestion,
  promptWrapper
} from './Prompt.module.scss'

const createValue = (value, caret, suggestion) => {
  const start = caret !== null ? value.slice(0, caret) : ''
  const end = caret !== null ? value.slice(caret) : ''

  return {
    start,
    suggestion,
    end,
    input: `${start}${end}`
  }
}

export const Prompt = ({ onEnter, onFocus, onBlur, inputRef, context, name, loading = false }) => {
  const [value, setValueState] = useState(null)
  const [suggestion, setSuggestion] = useState('')
  const [historialIndex, setHistorialIndex] = useState(0)

  const [historial, setHistorial] = useStorage({ key: storageKeys.PROMPT_HISTORY })
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const historialSize = config.getValueById(configInputIds.HISTORIAL_SIZE)
  const statusIndicator = config.getValueById(configInputIds.STATUS_INDICATOR)
  const isTruncated = config.getValueById(configInputIds.LINE_TRUNCATION)

  const setValue = value => {
    const formattedValue = createValue(value, inputRef.current.selectionStart, suggestion)

    setValueState(formattedValue)
  }

  const handleKeyDown = event => {
    const key = event.key
    const targetValue = event.target.value

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
      setHistorial(addHistoryValueConditionally(targetValue))
      setHistorialIndex(0)
      setValue('')

      return
    }

    if (historialIndex) setHistorialIndex(0)
    setSuggestion('test')
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  const addHistoryValueConditionally = targetValue => {
    return history => {
      const lastHistoryValue = history.at(-1)
      const isRepeatedAtEnd = lastHistoryValue === targetValue
      const newHistory = isRepeatedAtEnd ? history : [...history, targetValue]

      return newHistory.slice(historialSize * -1)
    }
  }

  const prefix = historialIndex || PROMPT_MARK
  const contextLines = context.split(/(?<!\\)\n/).filter(Boolean)

  return (
    <div data-loading={loading} data-indicator={statusIndicator} className={promptWrapper}>
      {contextLines.map((contextLine, index) => (
        <p key={`${contextLine}-${index}`} className={promptLine} data-truncated={isTruncated}>
          <ColoredText value={contextLine} />
        </p>
      ))}

      <span>{prefix}</span>
      <div className={promptInputWrapper}>
        <div className={promptOverlay}>
          {value?.start}
          <span className={promptSuggestion}>{value?.suggestion}</span>
          {value?.end}
        </div>

        <input
          spellCheck={false}
          ref={inputRef}
          className={promptInput}
          name={name}
          type="text"
          value={value?.input ?? ''}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />
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
