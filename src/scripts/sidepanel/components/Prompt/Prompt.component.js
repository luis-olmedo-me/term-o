import * as React from 'preact'
import { useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'
import ColoredText from '../ColoredText'
import Input from '../Input'
import { createPSO } from './Prompt.helpers'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, tab, disabled, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || '')
  const [historialIndex, setHistorialIndex] = useState(0)
  const [historial, setHistorial] = useState([])

  const { listening } = useConfig({ get: ['historial-size', 'status', 'prefix'] })
  const [hsitorialSize, status] = listening

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
      setHistorial(history => [...history, targetValue].slice(hsitorialSize * -1))
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

  const prefix = historialIndex || '$'

  return (
    <S.PromptWrapper>
      <S.Line>
        <ColoredText value={createPSO(status, tab)} />
      </S.Line>

      {disabled ? (
        <S.Line>
          <ColoredText value={`${prefix} ${value}`} />
        </S.Line>
      ) : (
        <Input
          inputRef={inputRef}
          value={historialIndex ? historial.at(historialIndex) : value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          prefix={prefix}
        />
      )}
    </S.PromptWrapper>
  )
}

Prompt.propTypes = {
  onEnter: Function,
  inputRef: Object,
  tab: Object,
  disabled: Boolean,
  defaultValue: String
}
