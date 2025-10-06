import * as React from 'preact'
import { useState } from 'preact/hooks'

import { validate } from '@src/helpers/primitive-validation.helpers'
import DynamicInput from '../DynamicInput'

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
  const [errorMessage, setErrorMessage] = useState(null)

  const tryApplyChange = (sectionId, inputId, newValue) => {
    try {
      validations.forEach(primitiveValidation => validate(primitiveValidation, newValue))

      changeConfig(sectionId, inputId, newValue)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  return (
    <DynamicInput
      errorMessage={errorMessage}
      handleClickInButtons={handleClickInButtons}
      inputId={inputId}
      name={name}
      onChange={tryApplyChange}
      options={options}
      postFix={postFix}
      sectionId={sectionId}
      type={type}
      value={value}
    />
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
