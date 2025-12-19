import * as React from 'preact'
import { useState } from 'preact/hooks'

import DynamicInput from '@src/components/DynamicInput'

import { getConfigDetailsByInputId } from '@src/helpers/config.helpers'
import { validate } from '@src/helpers/validation-primitive.helpers'
import * as S from './FieldRenderer.styles'

export const FieldRenderer = ({
  value,
  inputId,
  type,
  options,
  name,
  title,
  postFix,
  iconButton,
  changeConfig,
  validations,
  handleClickInButtons,
  sendNotification,
  description
}) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const tryApplyChange = (inputId, newValue) => {
    const inputDetails = getConfigDetailsByInputId(inputId)

    try {
      validations.forEach(primitiveValidation => validate(primitiveValidation, newValue))

      changeConfig(inputId, newValue)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error)
      sendNotification(inputDetails.name, error)
    }
  }

  return (
    <S.FieldWrapper>
      <S.FieldTitle>{title}</S.FieldTitle>

      <S.FieldDescription>{description}</S.FieldDescription>

      <S.InputWrapper aria-error={typeof errorMessage === 'string'} aria-type={type}>
        <DynamicInput
          errorMessage={errorMessage}
          handleClickInButtons={id => handleClickInButtons(id, setErrorMessage)}
          inputId={inputId}
          name={name}
          onChange={tryApplyChange}
          options={options}
          postFix={postFix}
          type={type}
          value={value}
          iconButton={iconButton}
        />
      </S.InputWrapper>

      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.FieldWrapper>
  )
}

FieldRenderer.propTypes = {
  value: String | Number | Boolean,
  inputId: String,
  type: String,
  title: String,
  name: String,
  postFix: String,
  iconButton: Object,
  options: Array,
  validations: Array,
  changeConfig: Function,
  handleClickInButtons: Function,
  sendNotification: Function,
  description: String
}
