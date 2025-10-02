import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Input, { inputVariants } from '@src/components/Input'
import useConfig from '@src/hooks/useConfig'
import FontSelect from '../FontSelect'
import Select from '../Select'
import Switch from '../Switch'
import ThemeSelect from '../ThemeSelect'

export const FieldRenderer = ({ value, sectionId, inputId, type, options, name, postFix }) => {
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
          name={name}
          value={localValue}
          onBlur={({ target }) => changeConfig(sectionId, inputId, target.value)}
          onChange={({ target }) => setLocalValue(target.value)}
          variant={inputVariants.OUTLINED}
          postFix={postFix}
        />
      )

    case 'number':
      return (
        <Input
          name={name}
          type="number"
          value={localValue}
          onBlur={({ target }) => changeConfig(sectionId, inputId, Number(target.value))}
          onChange={({ target }) => setLocalValue(target.value)}
          variant={inputVariants.OUTLINED}
          postFix={postFix}
        />
      )

    case 'boolean':
      return (
        <Switch
          type="checkbox"
          name={name}
          value={value}
          onChange={() => changeConfig(sectionId, inputId, !value)}
        />
      )

    case 'select':
      return (
        <Select
          options={options}
          value={value}
          name={name}
          onChange={({ target }) => changeConfig(sectionId, inputId, target.value)}
        />
      )

    case 'theme-select':
      return (
        <ThemeSelect
          name={name}
          value={value}
          onChange={({ target }) => changeConfig(sectionId, inputId, target.value)}
        />
      )

    case 'font-select':
      return (
        <FontSelect
          name={name}
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
  name: String,
  postFix: String,
  options: Array
}
