import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Input from '@src/components/Input'
import useConfig from '@src/hooks/useConfig'
import Select from '../Select'

export const FieldRenderer = ({ value, sectionId, inputId, type }) => {
  const [localValue, setLocalValue] = useState(value)

  const { changeConfig } = useConfig()

  useEffect(
    function updateLocalValue() {
      setLocalValue(value)
    },
    [value]
  )

  const inputs = {
    string: (
      <Input
        value={localValue}
        onBlur={({ target }) => changeConfig(sectionId, inputId, target.value)}
        onChange={({ target }) => setLocalValue(target.value)}
      />
    ),
    number: (
      <Input
        type="number"
        value={localValue}
        onBlur={({ target }) => changeConfig(sectionId, inputId, Number(target.value))}
        onChange={({ target }) => setLocalValue(target.value)}
      />
    ),
    boolean: (
      <Input
        type="checkbox"
        checked={value}
        onChange={() => changeConfig(sectionId, inputId, !value)}
        endText={localValue ? 'Enabled' : 'Disabled'}
      />
    ),
    select: <Select />
  }

  return inputs[type]
}

FieldRenderer.propTypes = {
  value: String | Number | Boolean,
  sectionId: String,
  inputId: String,
  type: String
}
