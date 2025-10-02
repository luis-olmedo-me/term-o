import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Input from '@src/components/Input'
import useConfig from '@src/hooks/useConfig'
import FontSelect from '../FontSelect'
import Select from '../Select'
import Switch from '../Switch'
import ThemeSelect from '../ThemeSelect'

export const FieldRenderer = ({ value, sectionId, inputId, type, options }) => {
  const [localValue, setLocalValue] = useState(value)

  const { changeConfig } = useConfig()

  useEffect(
    function updateLocalValue() {
      setLocalValue(value)
    },
    [value]
  )

  switch (type) {
    case 'string':
      return (
        <Input
          value={localValue}
          onBlur={({ target }) => changeConfig(sectionId, inputId, target.value)}
          onChange={({ target }) => setLocalValue(target.value)}
        />
      )

    case 'number':
      return (
        <Input
          type="number"
          value={localValue}
          onBlur={({ target }) => changeConfig(sectionId, inputId, Number(target.value))}
          onChange={({ target }) => setLocalValue(target.value)}
        />
      )

    case 'boolean':
      return (
        <Switch
          type="checkbox"
          value={value}
          onChange={() => changeConfig(sectionId, inputId, !value)}
        />
      )

    case 'select':
      return (
        <Select
          options={options}
          value={value}
          onChange={({ target }) => changeConfig(sectionId, inputId, target.value)}
        />
      )

    case 'theme-select':
      return (
        <ThemeSelect
          value={value}
          onChange={({ target }) => changeConfig(sectionId, inputId, target.value)}
        />
      )

    case 'font-select':
      return (
        <FontSelect
          value={value}
          onChange={({ target }) => changeConfig(sectionId, inputId, target.value)}
        />
      )

    default:
      return null
  }
}

FieldRenderer.propTypes = {
  value: String | Number | Boolean,
  sectionId: String,
  inputId: String,
  type: String,
  options: Array
}
