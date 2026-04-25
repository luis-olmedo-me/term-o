import { useState } from 'preact/hooks'

import DynamicInput from '@src/components/DynamicInput'

import { availableInputTypes } from '@src/constants/inputs.constants'
import { colorThemeKeys } from '@src/constants/themes.constants'
import { getConfigDetailsByInputId } from '@src/helpers/config.helpers'
import { validate } from '@src/helpers/validation-primitive.helpers'
import {
  field,
  field___mod_column,
  field___mod_error,
  field__description,
  field__error,
  field__input,
  field__input___mod_error,
  field__input___mod_full_width,
  field__leyends,
  field__title
} from './FieldRenderer.module.scss'

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
    if (value === newValue) return setErrorMessage(null)
    const inputDetails = getConfigDetailsByInputId(inputId)

    try {
      validations.forEach(primitiveValidation => validate(primitiveValidation, newValue))

      changeConfig(inputId, newValue)
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(error)
      sendNotification(inputDetails.name, error, colorThemeKeys.RED)
    }
  }

  const hasErrorMessage = typeof errorMessage === 'string'
  const isTextAreaInput = type === availableInputTypes.TEXT_AREA
  const isTextInput = isTextAreaInput || type === availableInputTypes.STRING

  return (
    <div
      className={`
        ${field}
        ${isTextAreaInput ? field___mod_column : ''}
        ${hasErrorMessage ? field___mod_error : ''}
      `}
    >
      <div className={field__leyends}>
        <h4 className={field__title}>{title}</h4>

        <p className={field__description}>{description}</p>

        {errorMessage && <span className={field__error}>{errorMessage}</span>}
      </div>

      <div
        className={`
          ${field__input}
          ${isTextInput ? field__input___mod_full_width : ''}
          ${hasErrorMessage ? field__input___mod_error : ''}
        `}
      >
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
      </div>
    </div>
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
