import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { storageKeys } from '@src/constants/storage.constants'
import useConfig, { configInputIds } from '@src/hooks/useConfig'
import useStorage, { namespaces } from '@src/hooks/useStorage'
import ColoredText from '../ColoredText'
import Input from '../Input'
import * as S from './Prompt.styles'

export const Prompt = ({ onEnter, inputRef, disabled, defaultValue, context, loading }) => {
  const [value, setValue] = useState(defaultValue || '')
  const [historialIndex, setHistorialIndex] = useState(0)
  const [historial, setHistorial] = useStorage({
    namespace: namespaces.LOCAL,
    key: storageKeys.PROMPT_HISTORY,
    defaultValue: []
  })

  const { listening } = useConfig({
    get: [configInputIds.HISTORIAL_SIZE, configInputIds.STATUS]
  })
  const [hsitorialSize] = listening

  useEffect(
    function expectForDefaultValueChanges() {
      setValue(defaultValue)
    },
    [defaultValue]
  )

  const handleChange = event => {
    const targetValue = event.target.value

    setValue(targetValue)
    if (historialIndex) setHistorialIndex(0)
  }

  const handleKeyDown = event => {
    if (loading) return

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
    <S.PromptWrapper className={loading ? 'loading' : null}>
      <S.Line>
        <ColoredText value={context} />
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
  context: String,
  disabled: Boolean,
  loading: Boolean,
  defaultValue: String
}
