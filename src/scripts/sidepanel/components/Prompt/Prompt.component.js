import * as React from 'preact'
import { useState } from 'preact/hooks'

import { HISTORIAL_SIZE } from '@sidepanel/config'
import ColoredText from '../ColoredText'
import Input from '../Input'
import { createPSO } from './Prompt.helpers'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, tab, pso }) => {
  const [value, setValue] = useState('')
  const [historialIndex, setHistorialIndex] = useState(0)
  const [historial, setHistorial] = useState([])

  const handleChange = event => {
    const targetValue = event.target.value

    setValue(targetValue)
    if (historialIndex) setHistorialIndex(0)
  }

  const handleKeyDown = event => {
    const key = event.key
    const targetValue = event.target.value

    if (key === 'Enter' && targetValue) {
      onEnter(targetValue)
      setHistorial(history => [...history, targetValue].slice(HISTORIAL_SIZE * -1))
      setHistorialIndex(0)
      setValue('')
    }

    if (key === 'ArrowUp') {
      event.preventDefault()

      setHistorialIndex(index => {
        const newIndex = index - 1
        const canBeStored = newIndex * -1 <= historial.length

        return canBeStored ? newIndex : index
      })
    }

    if (key === 'ArrowDown') {
      event.preventDefault()

      setHistorialIndex(index => {
        const newIndex = index + 1
        const canBeStored = newIndex <= 0

        return canBeStored ? newIndex : index
      })
    }
  }

  return (
    <S.PromptWrapper>
      <S.Decoration>
        <ColoredText value={createPSO(pso, tab)} />
      </S.Decoration>

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

Prompt.propTypes = {
  onEnter: Function,
  inputRef: Object,
  tab: Object,
  pso: String
}
