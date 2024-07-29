import * as React from 'preact'
import { useState } from 'preact/hooks'

import useConfig from '@src/hooks/useConfig'
import Input from '../Input'

export const FieldRenderer = ({ value, sectionId, inputId, type }) => {
  const [localValue, setLocalValue] = useState(value)

  const { changeConfig } = useConfig()

  const inputs = {
    text: (
      <Input
        value={localValue}
        onBlur={({ target }) => changeConfig(sectionId, inputId, target.value)}
        onChange={({ target }) => setLocalValue(target.value)}
      />
    ),
    default: () => <span>Default Input</span>
  }

  const InputComponent = inputs[type] || inputs.default

  return InputComponent
}

FieldRenderer.propTypes = {
  value: String | Number | Boolean,
  sectionId: String,
  inputId: String,
  type: String
}
