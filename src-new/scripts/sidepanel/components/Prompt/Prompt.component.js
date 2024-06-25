import { invalidURLsStarts } from '@src/constants/events.constants'
import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Input from '../Input'
import { createPSO } from './Prompt.helpers'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, tab, pso }) => {
  const [value, setValue] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
  }

  const handleKeyDown = event => {
    const key = event.key

    if (key === 'Enter') {
      onEnter(value)
      setValue('')
    }
  }

  useEffect(function URLValidation() {
    if (!tab) return

    const isInvalidUrl = invalidURLsStarts.some(invalidUrl => tab.url.startsWith(invalidUrl))

    setDisabled(isInvalidUrl)
  })

  return (
    <S.PromptWrapper aria-disabled={disabled}>
      <S.Decoration>{createPSO(pso, tab)}</S.Decoration>

      <Input
        inputRef={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        prefix="$"
      />
    </S.PromptWrapper>
  )
}
