import React from 'react'

import { HistoryInterpreter } from '../HistoryInterpreter/HistoryInterpreter.component'
import styles from './CommandInput.styles.scss'

export const CommandInput = ({
  interpreterClassName,
  inputRef,
  value,
  placeHolder,
  onChange,
  onKeyDown,
  commandKeywords,
  palette
}) => {
  const handleInputKeyDown = ({ key, target }) => {
    const keyInLowerCase = key.toLowerCase()

    target.selectionStart = target.value.length
    target.selectionEnd = target.value.length

    onKeyDown(keyInLowerCase)
  }

  const enableInput = () => {
    inputRef?.current?.focus()
  }

  const hasValue = Boolean(value)

  return (
    <div className={styles.input_wrapper}>
      <input
        className={styles.input}
        ref={inputRef}
        type='text'
        onChange={onChange}
        onKeyDown={handleInputKeyDown}
        value={value}
      />

      <HistoryInterpreter
        className={`
          ${interpreterClassName}
          ${!hasValue ? styles.place_holder : ''}
        `}
        histories={[[{ value: value || placeHolder, type: 'command' }]]}
        commandKeywords={commandKeywords}
        onClick={enableInput}
        palette={palette}
      />
    </div>
  )
}
