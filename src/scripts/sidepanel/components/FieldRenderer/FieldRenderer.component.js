import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'
import Input from '../Input'

export const FieldRenderer = ({ value, sectionId, inputId, type }) => {
  const [localValue, setLocalValue] = useState(value)

  const isDifferentValue = localValue !== value
  const isCheckbox = type === 'checkbox'

  const { changeConfig } = useConfig()

  useEffect(
    function updateLocalValue() {
      if (isDifferentValue && isCheckbox) setLocalValue(value)
    },
    [isDifferentValue, isCheckbox]
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
        onBlur={({ target }) => changeConfig(sectionId, inputId, target.value)}
        onChange={({ target }) => setLocalValue(target.value)}
      />
    ),
    boolean: (
      <Input
        type="checkbox"
        checked={localValue}
        onChange={({ target }) => changeConfig(sectionId, inputId, target.checked)}
        endText={localValue ? 'Yes' : 'No'}
      />
    )
  }

  return inputs[type]
}

FieldRenderer.propTypes = {
  value: String | Number | Boolean,
  sectionId: String,
  inputId: String,
  type: String
}
