import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Button, { buttonVariants } from '@src/components/Button'
import FontSelect from '@src/components/FontSelect'
import Input, { inputTypes, inputVariants } from '@src/components/Input'
import Select from '@src/components/Select'
import { ColorDot } from '@src/components/Select/OptionPrefixes'
import Switch from '@src/components/Switch'
import TextArea from '@src/components/TextArea'
import ThemeSelect from '@src/components/ThemeSelect'

import { availableInputTypes } from '@src/constants/inputs.constants'
import { validate } from '@src/helpers/primitive-validation.helpers'

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
          errorMessage={errorMessage}
          fullWidth
          name={name}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          onChange={({ target }) => setLocalValue(target.value)}
          postFix={postFix}
          type={inputTypes.TEXT}
          value={localValue}
          variant={inputVariants.OUTLINED}
        />
      )

    case availableInputTypes.NUMBER:
      return (
        <Input
          errorMessage={errorMessage}
          name={name}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, Number(target.value))}
          onChange={({ target }) => setLocalValue(target.value)}
          postFix={postFix}
          type={inputTypes.NUMBER}
          value={localValue}
          variant={inputVariants.OUTLINED}
        />
      )

    case availableInputTypes.TEXT_AREA:
      return (
        <TextArea
          maxLines={6}
          name={name}
          onBlur={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          onChange={({ target }) => setLocalValue(target.value)}
          value={localValue}
        />
      )

    case availableInputTypes.BOOLEAN:
      return (
        <Switch
          name={name}
          onChange={() => tryApplyChange(sectionId, inputId, !value)}
          type="checkbox"
          value={value}
        />
      )

    case availableInputTypes.SELECT:
      return (
        <Select
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          options={options}
          value={value}
        />
      )

    case availableInputTypes.COLOR_SELECT:
      return (
        <Select
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          OptionPrefixComponent={ColorDot}
          options={options}
          value={value}
        />
      )

    case availableInputTypes.THEME_SELECT:
      return (
        <ThemeSelect
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          value={value}
        />
      )

    case availableInputTypes.FONT_SELECT:
      return (
        <FontSelect
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          value={value}
        />
      )

    case availableInputTypes.BUTTON:
      return (
        <Button
          onClick={() => handleClickInButtons(sectionId, inputId)}
          value={value}
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
