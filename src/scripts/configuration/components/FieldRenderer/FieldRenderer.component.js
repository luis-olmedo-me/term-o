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
import { TextArea } from '../TextArea'
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

  const inputs = {
    [availableInputTypes.STRING]: (
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
    ),

    [availableInputTypes.NUMBER]: (
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
    ),

    [availableInputTypes.TEXT_AREA]: (
      <TextArea
        maxLines={6}
        name={name}
        onBlur={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        onChange={({ target }) => setLocalValue(target.value)}
        value={localValue}
      />
    ),

    [availableInputTypes.BOOLEAN]: (
      <Switch
        name={name}
        onChange={() => tryApplyChange(sectionId, inputId, !value)}
        type="checkbox"
        value={value}
      />
    ),

    [availableInputTypes.SELECT]: (
      <Select
        name={name}
        onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        options={options}
        value={value}
      />
    ),

    [availableInputTypes.COLOR_SELECT]: (
      <Select
        name={name}
        onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        OptionPrefixComponent={ColorDot}
        options={options}
        value={value}
      />
    ),

    [availableInputTypes.THEME_SELECT]: (
      <ThemeSelect
        name={name}
        onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        value={value}
      />
    ),

    [availableInputTypes.FONT_SELECT]: (
      <FontSelect
        name={name}
        onChange={({ target }) => tryApplyChange(sectionId, inputId, target.value)}
        value={value}
      />
    ),

    [availableInputTypes.BUTTON]: (
      <Button
        onClick={() => handleClickInButtons(sectionId, inputId)}
        value={value}
        variant={buttonVariants.OUTLINED_DANGER}
      />
    )
  }

  return (
    <>
      {inputs[type]}

      <div></div>
    </>
  )
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
