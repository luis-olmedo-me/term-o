import * as React from 'preact'
import { useState } from 'preact/hooks'

import DynamicInput from '@src/components/DynamicInput'
import { validate } from '@src/helpers/validation-primitive.helpers'
import * as S from './FieldRenderer.styles'

export const FieldRenderer = ({
  value,
  sectionId,
  inputId,
  type,
  options,
  name,
  title,
  postFix,
  changeConfig,
  validations,
  handleClickInButtons,
  description
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
    <S.FieldWrapper>
      <S.FieldTitle>{title}</S.FieldTitle>

      <S.FieldDescription>{description}</S.FieldDescription>

      <S.InputWrapper aria-error={typeof errorMessage === 'string'} aria-type={type}>
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
      </S.InputWrapper>

      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.FieldWrapper>
  )
}

FieldRenderer.propTypes = {
  value: String | Number | Boolean,
  sectionId: String,
  inputId: String,
  type: String,
  title: String,
  name: String,
  postFix: String,
  options: Array,
  validations: Array,
  changeConfig: Function,
  handleClickInButtons: Function,
  description: String
}
