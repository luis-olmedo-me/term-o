import { invalidURLsStarts } from '@src/constants/events.constants'
import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Input from '../Input'
import { createPSO } from './Prompt.helpers'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, tab, pso }) => {
  const [value, setValue] = useState('')
  const [historialIndex, setHistorialIndex] = useState(0)
  const [historial, setHistorial] = useState([])

  const handleChange = event => {
    const value = event.target.value

    setValue(value)
    if (historialIndex) setHistorialIndex(0)
  }

  const handleKeyDown = event => {
    const key = event.key

    if (key === 'Enter') {
      onEnter(value)
      setHistorial(history => [...history, value])
      setValue('')
    }

    if (key === 'ArrowUp') {
      event.preventDefault()

      setHistorialIndex(index => index - 1)
    }

    if (key === 'ArrowDown') {
      event.preventDefault()

      setHistorialIndex(index => index + 1)
    }
  }

  return (
    <S.PromptWrapper>
      <S.Decoration>{createPSO(pso, tab)}</S.Decoration>

      <Input
        inputRef={inputRef}
        value={historialIndex ? historial.at(historialIndex) : value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        prefix={historialIndex || '$'}
      />
    </S.PromptWrapper>
  )
}
