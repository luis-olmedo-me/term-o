import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import ColoredText from '@sidepanel/components/ColoredText'
import Input, { inputTypes, inputVariants } from '@src/components/Input'
import useStorage from '@src/hooks/useStorage'

import { configInputIds, PROMPT_MARK } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { Line } from '@src/styles/Global.styles'
import * as S from './Prompt.styles'

export const Prompt = ({
  onEnter,
  onFocus,
  onBlur,
  inputRef,
  defaultValue,
  context,
  name,
  loading = false,
  className = null
}) => {
  const [value, setValue] = useState(defaultValue || '')
  const [historialIndex, setHistorialIndex] = useState(0)

  const [historial, setHistorial] = useStorage({ key: storageKeys.PROMPT_HISTORY })
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const historialSize = config.getValueById(configInputIds.HISTORIAL_SIZE)
  const statusIndicator = config.getValueById(configInputIds.STATUS_INDICATOR)

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
      setHistorial(history => [...history, targetValue].slice(historialSize * -1))
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

  const prefix = historialIndex || PROMPT_MARK

  return (
    <S.PromptWrapper aria-loading={loading} aria-indicator={statusIndicator} className={className}>
      <Line>
        <ColoredText value={context} />
      </Line>

      <Input
        inputRef={inputRef}
        value={historialIndex ? historial.at(historialIndex) : value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        prefix={prefix}
        name={name}
        variant={inputVariants.GHOST}
        type={inputTypes.TEXT}
        fullWidth
      />
    </S.PromptWrapper>
  )
}

Prompt.propTypes = {
  onEnter: Function,
  onFocus: Function,
  onBlur: Function,
  inputRef: Object,
  context: String,
  loading: Boolean,
  defaultValue: String,
  className: String,
  name: String
}
