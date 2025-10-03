import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Button, { buttonVariants } from '@src/components/Button'
import Input, { inputTypes, inputVariants } from '@src/components/Input'
import { availableInputTypes } from '@src/constants/inputs.constants'
import { validate } from '@src/helpers/primitive-validation.helpers'
import FontSelect from '../FontSelect'
import Select from '../Select'
import { ColorDot } from '../Select/OptionPrefixes'
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
    case availableInputTypes.STRING:
      return (
        <Input
          name={name}
          value={localValue}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          onChange={({ target }) => setLocalValue(target.value)}
          variant={inputVariants.OUTLINED}
          type={inputTypes.TEXT}
          postFix={postFix}
          errorMessage={errorMessage}
          fullWidth
        />
      )

    case availableInputTypes.NUMBER:
      return (
        <Input
          name={name}
          value={localValue}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, Number(target.value))}
          onChange={({ target }) => setLocalValue(target.value)}
          variant={inputVariants.OUTLINED}
          type={inputTypes.NUMBER}
          postFix={postFix}
          errorMessage={errorMessage}
        />
      )

    case availableInputTypes.BOOLEAN:
      return (
        <Switch
          type="checkbox"
          name={name}
          value={value}
          onChange={() => tryApplyChange(sectionId, inputId, !value)}
        />
      )

    case availableInputTypes.SELECT:
      return (
        <Select
          options={options}
          value={value}
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case availableInputTypes.COLOR_SELECT:
      return (
        <Select
          OptionPrefix={ColorDot}
          options={options}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          name={name}
        />
      )

    case availableInputTypes.THEME_SELECT:
      return (
        <ThemeSelect
          name={name}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case availableInputTypes.FONT_SELECT:
      return (
        <FontSelect
          name={name}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case availableInputTypes.BUTTON:
      return (
        <Button
          text={value}
          onClick={() => handleClickInButtons(sectionId, inputId)}
          variant={buttonVariants.OUTLINED_DANGER}
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
  options: Array,
  validations: Array,
  changeConfig: Function,
  handleClickInButtons: Function
}
