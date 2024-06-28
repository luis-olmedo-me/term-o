import { invalidURLsStarts } from '@src/constants/events.constants'
import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Input from '../Input'
import { createPSO } from './Prompt.helpers'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, tab, pso }) => {
  const [value, setValue] = useState('')

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

  return (
    <S.PromptWrapper>
      <S.Decoration>{createPSO(pso, tab)}</S.Decoration>

      <Input
        inputRef={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        prefix="$"
      />
    </S.PromptWrapper>
  )
}
