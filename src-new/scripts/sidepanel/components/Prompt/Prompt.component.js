import * as React from 'preact'
import { useState } from 'preact/hooks'
import Input from '../Input'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, pso }) => {
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
      <S.Decoration>{pso}</S.Decoration>

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
