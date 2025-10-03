import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Input, { inputVariants } from '@src/components/Input'
import { validate } from '@src/helpers/primitive-validation.helpers'
import Button from '@src/scripts/sidepanel/components/Button'
import FontSelect from '../FontSelect'
import Select from '../Select'
import Switch from '../Switch'
import ThemeSelect from '../ThemeSelect'

export const FieldRenderer = ({
  value,
  sectionId,
  inputId,
  type,
  options,
  name,
  postFix,
  changeConfig,
  validations,
  handleClickInButtons
}) => {
  const [localValue, setLocalValue] = useState(value)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(
    function updateLocalValue() {
      setLocalValue(value)
    },
    [value]
  )

  const tryApplyChange = (sectionId, inputId, newValue) => {
    try {
      validations.forEach(primitiveValidation => validate(primitiveValidation, newValue))

      changeConfig(sectionId, inputId, newValue)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  switch (type) {
    case 'string':
      return (
        <Input
          name={name}
          value={localValue}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          onChange={({ target }) => setLocalValue(target.value)}
          variant={inputVariants.OUTLINED}
          postFix={postFix}
          errorMessage={errorMessage}
          fullWidth
        />
      )

    case 'number':
      return (
        <Input
          name={name}
          type="number"
          value={localValue}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, Number(target.value))}
          onChange={({ target }) => setLocalValue(target.value)}
          variant={inputVariants.OUTLINED}
          postFix={postFix}
          errorMessage={errorMessage}
        />
      )

    case 'boolean':
      return (
        <Switch
          type="checkbox"
          name={name}
          value={value}
          onChange={() => tryApplyChange(sectionId, inputId, !value)}
        />
      )

    case 'select':
      return (
        <Select
          options={options}
          value={value}
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case 'theme-select':
      return (
        <ThemeSelect
          name={name}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case 'font-select':
      return (
        <FontSelect
          name={name}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case 'button':
      return <Button text={value} onClick={() => handleClickInButtons(sectionId, inputId)} />

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
  options: Array,
  validations: Array,
  changeConfig: Function,
  handleClickInButtons: Function
}
