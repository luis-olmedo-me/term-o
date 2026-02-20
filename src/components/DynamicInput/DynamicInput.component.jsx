import { useEffect, useState } from 'preact/hooks'

import Button from '@src/components/Button'
import FontSelect from '@src/components/FontSelect'
import Input, { inputTypes, inputVariants } from '@src/components/Input'
import Select, { ColorDot } from '@src/components/Select'
import Switch from '@src/components/Switch'
import TextArea from '@src/components/TextArea'
import ThemeSelect from '@src/components/ThemeSelect'
import { availableInputTypes } from '@src/constants/inputs.constants'
import { getButtonVariantFromType } from './DynamicInput.helpers'

export const DynamicInput = ({
  value,
  inputId,
  type,
  options,
  name,
  postFix,
  iconButton,
  errorMessage,
  onChange,
  handleClickInButtons
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(
    function updateLocalValue() {
      setLocalValue(value)
    },
    [value]
  )

  switch (type) {
    case availableInputTypes.STRING:
      return (
        <Input
          errorMessage={errorMessage}
          fullWidth
          name={name}
          onBlur={({ target }) => onChange(inputId, target.value)}
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
          onBlur={({ target }) => onChange(inputId, Number(target.value))}
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
          onBlur={({ target }) => onChange(inputId, target.value)}
          value={localValue}
        />
      )

    case availableInputTypes.BOOLEAN:
      return (
        <Switch
          name={name}
          onChange={({ target }) => onChange(inputId, target.checked)}
          type="checkbox"
          value={value}
        />
      )

    case availableInputTypes.SELECT:
      return (
        <Select
          name={name}
          onChange={({ target }) => onChange(inputId, target.value)}
          options={options}
          value={value}
        />
      )

    case availableInputTypes.COLOR_SELECT:
      return (
        <Select
          name={name}
          onChange={({ target }) => onChange(inputId, target.value)}
          OptionPrefixComponent={ColorDot}
          options={options}
          value={value}
        />
      )

    case availableInputTypes.THEME_SELECT:
      return (
        <ThemeSelect
          name={name}
          onChange={({ target }) => onChange(inputId, target.value)}
          value={value}
        />
      )

    case availableInputTypes.FONT_SELECT:
      return (
        <FontSelect
          name={name}
          onChange={({ target }) => onChange(inputId, target.value)}
          value={value}
        />
      )

    case availableInputTypes.BUTTON:
    case availableInputTypes.BUTTON_WARN:
    case availableInputTypes.BUTTON_DANGER:
      return (
        <Button
          onClick={() => handleClickInButtons(inputId)}
          variant={getButtonVariantFromType(type)}
          Icon={iconButton}
          value={value}
        />
      )

    default:
      return null
  }
}

DynamicInput.propTypes = {
  value: String | Number | Boolean,
  inputId: String,
  errorMessage: String,
  type: String,
  name: String,
  postFix: String,
  iconButton: Object,
  options: Array,
  onChange: Function,
  handleClickInButtons: Function
}
