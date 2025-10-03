import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import Button, { buttonVariants } from '@src/components/Button'
import Input, { inputTypes, inputVariants } from '@src/components/Input'
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
    case inputTypes.STRING:
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

    case inputTypes.NUMBER:
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

    case inputTypes.BOOLEAN:
      return (
        <Switch
          type="checkbox"
          name={name}
          value={value}
          onChange={() => tryApplyChange(sectionId, inputId, !value)}
        />
      )

    case inputTypes.SELECT:
      return (
        <Select
          options={options}
          value={value}
          name={name}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case inputTypes.COLOR_SELECT:
      return (
        <Select
          OptionPrefix={({ option }) => <ColorDot color={option.id} />}
          options={options}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
          name={name}
        />
      )

    case inputTypes.THEME_SELECT:
      return (
        <ThemeSelect
          name={name}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case inputTypes.FONT_SELECT:
      return (
        <FontSelect
          name={name}
          value={value}
          onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        />
      )

    case inputTypes.BUTTON:
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
